import styles from "../styles/Forms.module.css";
import { useState, useCallback } from "react";
import "../styles/Home.css";
import Pagination from "../features/Pagination";
import Search from "../features/Search.jsx";
import ResultList from "../features/ResultList.jsx";

function Home({ myBooks, setMyBooks, currentPage, handleNextPage, handlePrevPage }) {
  const LIBRARY_URL = `https://openlibrary.org/search.json?`;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  // search component
  const [searched, setIsSearched] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;
  // search component

  // to be removed once backend is up
  // const AIRTABLE_URL = `https://api.airtable.com/v0/${
  //   import.meta.env.VITE_BASE_ID
  // }/${import.meta.env.VITE_TABLE_NAME}`;
  // const token = `Bearer ${import.meta.env.VITE_PAT}`;

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     setIsLoading(true);
  //     const options = { method: "GET", headers: { Authorization: token } };

  //     try {
  //       const resp = await fetch(AIRTABLE_URL, options);
  //       if (!resp.ok) {
  //         throw new Error(resp.message);
  //       }
  //       const data = await resp.json();
  //       const myCollection = data.records.map((record) => {
  //         const book = {
  //           id: record.id,
  //           title: record.fields.title,
  //           author_name: record.fields.author_name,
  //           first_publish_year: record.fields.first_publish_year,
  //         };
  //         return book;
  //       });
  //       setMyBooks([...myCollection]);
  //       console.log("My books: ", myCollection);

  //       console.log("Response: ", resp);
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchBooks();
  // }, []);
  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  

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

  // backend functionality
  const handleAddBook = async (result) => {
    console.log("result from add: ", result);
    const payload = {
      fields: {
        title: result.title,
        author_name: result.author_name[0],
        first_publish_year: result.first_publish_year,
        delete: false,
        read_book: false,
      },
    };
    console.log("Payload: ", JSON.stringify(payload));

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      console.log("Payload from add: ", payload);
      const resp = await fetch(AIRTABLE_URL, options);
      console.log("Resp: ", resp);
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const result = await resp.json();
      const savedBook = {
        id: result.id,
        title: result.fields.title,
        author_name: result.fields.author_name,
        first_publish_year: result.fields.first_publish_year,
        delete: result.fields.delete,
        readBook: result.fields.readBook,
      };
      if (!result.fields.delete) {
        savedBook.delete = false;
      }
      setMyBooks([...myBooks, savedBook]);
      setIsAddOpen(true);
    } catch (error) {
      setErrorMessage(error);
      console.log("Error: ", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToggle = () => {
    setIsAddOpen((prevState) => !prevState);
  };
  // book card

  return (
    <div>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <button type="button" onClick={handleSearch} className={styles.formBtn}>
        Search
      </button>

      {/* wrap resultList in div -- conditionally rendered if something comes up from the search; if no results, no result div */}
      <ResultList
        searched={searched}
        resultList={resultList}
        handleAddBook={handleAddBook}
        isAddOpen={isAddOpen}
        handleAddToggle={handleAddToggle}
      />
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
