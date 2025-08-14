import Modal from "../shared/Modal";
import Result from "../shared/Result";

function ResultList ({searched, resultList, handleAddBook, isAddOpen, handleAddToggle}) {
    return (
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
    );
}

export default ResultList;