import BookShow from "./BookShow";
import { useContext } from "react";
import BooksContext from '../context/books'

function BookList(){
    const {books} = useContext(BooksContext);
    const renderBooks = books.map((book) => {
        return <BookShow key={book.id} book={book}/>
    })
    return <>
    <div className="book-list">{renderBooks}</div>
    </>
}

export default BookList;