import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import { Message } from "primereact/message";

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
            <h1>Books</h1>
            <br/>
            <div className="p-grid">
                {books.map((book, i) =>
                    <div className="p-col">
                        <Card key={book[i].id}
                              title={book[i].title.substring(0, 18)}
                              subTitle={book[i].author.substring(0, 22)}
                              style={{ width: "250px", height: "530px" }}
                              header={<img src={"http://covers.openlibrary.org/b/isbn/" + book[i].isbn + "-L.jpg"}
                                           alt={book[i].title}
                                           height="380px"/>}>
                            ISBN: {book[i].isbn}
                            <br/>
                            {book[i].status === "ON_SHELF" && <Button label="Checkout" onClick={() => {
                                axios.put("http://localhost:8080/api/v1/books/" + book[i].isbn + "/checkout")
                                    .then(() => {
                                        book[i].status = "CHECKED_OUT";
                                        setBooks(currentBooks => ([...currentBooks]));
                                    });
                            }}/>}
                            {book[i].status === "CHECKED_OUT" && <Message severity="warn" text="Checked Out"/>}
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;