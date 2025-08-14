import "../styles/Pagination.css";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
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
  return (
    <nav>
      <button
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
