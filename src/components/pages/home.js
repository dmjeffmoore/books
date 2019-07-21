import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';


function Home() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const result = await axios("http://localhost:8080/api/v1/books");
            let books = [];
            for (let i = 0; i < result.data.length; i++) {
                let o = {};
                o[i] = result.data[i];
                books.push(o)
            }
            setBooks(books);
            console.log(books);
        };
        fetchBooks();
    }, []);

    return(
        <div>
            {books.map((book, i) =>
                <Card key={book[i].id} title={book[i].title}>
                    {book[i].author}
                    <br/>
                    {book[i].isbn}
                </Card>
            )}
        </div>
    )
}

export default Home;