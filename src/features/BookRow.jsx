import { useState } from "react";

function BookRow ({book}) {
const [readBook, setReadBook] = useState(false);

const handleReadBook = (e) => {
    setReadBook(e.target.checked)
    console.log("Read book: ", readBook)
}

const deleteBook = (e) => {
    localStorage.removeItem(result.key);
    
}

    return (
      <tr key={book.key}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.year}</td>
        <td>
          <button type="button" onClick={deleteBook}>Delete</button>
        </td>
        <td>
          <form>
            <input type="checkbox" onChange={handleReadBook} checked={readBook} />
          </form>
        </td>
      </tr>
    );
}

export default BookRow;