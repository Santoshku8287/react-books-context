import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App(){
const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, [])

    const fetchBooks = async() => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    }

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {title});
        const updatedBook = [
            ...books, 
            response.data
        ];
        setBooks(updatedBook);
    }

    const deleteBookById = async(id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        })
        setBooks(updatedBooks);
    }

    const updateBookById = async(id, title) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {title});
        const updatedBook = books.map((book) => {
            if(book.id === id){
                return {...book, ...response.data}
            }
            return book
        });
        setBooks(updatedBook);
    }

    return <div className="app">
        <h1>Reading List</h1>
        <BookList books={books} onDelete={deleteBookById} onEdit={updateBookById}/>
        <BookCreate onCreate={createBook}/>
        </div>
}

export default App;