import '../styles/MyBooks.css'
import { useState } from 'react';
import BookRow from '../features/BookRow';

function MyBooks({myBooks}) {
    const [readBook, setReadBook] = useState(false)
    console.log("My books in component: ", myBooks);
    // read list of books from localStorage
    // set to my books

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Year</th>
              <th>Delete</th>
              <th>Read Book Already?</th>
            </tr>
          </thead>
          <tbody>
            {myBooks.map((book) => (
              <BookRow book={book} key={book.id} />
            ))}
          </tbody>
        </table>
      </>
    );
}

export default MyBooks