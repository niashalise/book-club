import '../styles/Pagination.css'

function Pagination ({ currentPage, handlePrevPage, handleNextPage, totalPages }) {
    return (
        <nav>
            <button type="button" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button type="button" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </nav>
    )
}

export default Pagination