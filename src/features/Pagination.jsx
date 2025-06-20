function Pagination ({ currentPage, handlePrevPage, handleNextPage, totalPages }) {
    return (
        <nav>
            <button type="button" onClick={handlePrevPage}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button type="button" onClick={handleNextPage}>Next</button>
        </nav>
    )
}

export default Pagination