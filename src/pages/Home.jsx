import styles from "../styles/Forms.module.css";
import { useEffect, useState } from "react";
import "../styles/Home.css";
import Pagination from "../features/Pagination";
import { useNavigate, useSearchParams } from "react-router";
import Modal from '../shared/Modal';

function Home() {
  const url = `https://openlibrary.org/search.json?`;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const [myBooks, setMyBooks] = useState([]);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  const navigate = useNavigate();

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

  const handleSearch = async () => {
    try {
      if (searchQuery != "") {
        const response = await fetch(encodeURI(`${url}q=${searchQuery}`), {
          method: "GET",
        });
        const result = await response.json();
        if (response.ok === false) {
          throw new Error(response.status);
        } else {
          setSearchResults(result.docs);
          setTotalPages(Math.ceil(result.num_found / itemsPerPage));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resultList = searchResults.slice(indexOfFirstEntry, indexOfFirstEntry + itemsPerPage);

  const handleAddBook = () => {
    
  }

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
        {resultList.map((result) => (
          <div className="container" key={result.key}>
            <div>
              {result.title} by {result.author_name ? result.author_name : "Unknown"}, {result.first_publish_year ? result.first_publish_year : "Unknown"}
            </div>
            <button type="button">Add Book</button>
          </div>
        ))}
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
