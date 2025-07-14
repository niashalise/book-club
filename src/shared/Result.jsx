import Add from "./Add";
import NoImage from "./NoImage";


function Result({result, handleAddBook}) {
    return (
      <div className="container">
        <div>
          {result.title} by
          {result.author_name ? result.author_name : "Unknown"},
          {result.first_publish_year ? result.first_publish_year : "Unknown"}
        </div>
        <div className="add" onClick={() => handleAddBook(result)}>
          <Add />
        </div>
        {result.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`}
            alt="book cover"
          ></img>
        ) : (
          <NoImage />
        )}
      </div>
    );
}

export default Result;