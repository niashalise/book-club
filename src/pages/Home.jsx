import styles from "../styles/Forms.module.css";
import { useEffect, useState, useCallback } from "react";
import "../styles/Home.css";
import Pagination from "../features/Pagination";
import { useNavigate, useSearchParams } from "react-router";
import Modal from "../shared/Modal";
import Add from "../shared/Add.jsx";
import NoImage from "../shared/NoImage.jsx";
import Result from "../shared/Result.jsx";

function Home({ myBooks, setMyBooks }) {
  const LIBRARY_URL = `https://openlibrary.org/search.json?`;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searched, setIsSearched] = useState(false);
  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const AIRTABLE_URL = `https://api.airtable.com/v0/${
    import.meta.env.VITE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const options = { method: "GET", headers: { Authorization: token } };

      try {
        const resp = await fetch(AIRTABLE_URL, options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const data = await resp.json();
        const myCollection = data.records.map((record) => {
          const book = {
            id: record.id,
            title: record.fields.title,
            author_name: record.fields.author_name,
            first_publish_year: record.fields.first_publish_year,
          };
          return book;
        });
        setMyBooks([...myCollection]);
        console.log("My books: ", myCollection);

        console.log("Response: ", resp);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [myBooks]);

  const handlePrevPage = () => {
    setSearchParams({ page: Math.max(1, currentPage - 1) });
  };

  const handleNextPage = () => {
    setSearchParams({ page: Math.min(currentPage + 1, totalPages) });
  };

  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage < 1 || currentPage > totalPages || isNaN(currentPage)) {
        navigate("/");
      }
    }
  }, [currentPage, totalPages, navigate]);

  const userSearch = (e) => {
    const { name, value } = e.target;

    setSearchQuery(value);
  };

  const handleSearch = useCallback(async () => {
    try {
      if (searchQuery != "") {
        const response = await fetch(
          encodeURI(`${LIBRARY_URL}q=${searchQuery}`),
          {
            method: "GET",
          }
        );
        const result = await response.json();
        if (response.ok === false) {
          throw new Error(response.status);
        } else {
          setSearchResults(result.docs);
          setTotalPages(Math.ceil(result.num_found / itemsPerPage));
          setIsSearched(true);
        }
        console.log("response: ", response);
        console.log("result: ", result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery]);

  const resultList = searchResults.slice(
    indexOfFirstEntry,
    indexOfFirstEntry + itemsPerPage
  );

  const handleAddBook = async (result) => {
    console.log("result from add: ", result);
    const payload = {
      records: [
        {
          fields: {
            title: result.title,
            author_name: result.author_name,
            first_publish_year: result.first_publish_year,
            delete: false,
            readBook: false
          },
        },
      ],
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    try {
      setIsSaving(true);
      console.log("Payload from add: ", payload);
      const resp = await fetch(AIRTABLE_URL, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();
      const savedBook = {
        id: records[0].id,
        title: records[0].fields.title,
        author_name: records[0].fields.author_name,
        first_publish_year: records[0].fields.first_publish_year,
        delete: records[0].fields.delete,
        readBook: records[0].fields.readBook
      }
      if (!records[0].fields.delete) {
        savedBook.delete = false;
      }
      setMyBooks([...myBooks, savedBook])
      setIsAddOpen(true)
    } catch(error) {
      setErrorMessage(error);
      console.log("Error: ", error)
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToggle = () => {
    setIsAddOpen((prevState) => !prevState);
  };

  return (
    <div>
      <form>
        <label htmlFor="search" className={styles.search}>
          Search:
        </label>
        <input
          type="text"
          id="search"
          name="search"
          className={styles.searchInput}
          value={searchQuery}
          onChange={userSearch}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      <div className="results">
        {searched && resultList.length === 0 ? (
          <p>No results found</p>
        ) : (
          resultList.map((result) => (
            <Result
              key={result.key}
              handleAddBook={handleAddBook}
              result={result}
            />
          ))
        )}
        <Modal isOpen={isAddOpen} handleToggle={handleAddToggle}>
          Book Added
        </Modal>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
}

export default Home;
