import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withAuth } from "@okta/okta-react";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import { Message } from "primereact/message";
import { Growl } from 'primereact/growl';

import Menu from "../menu";
import {useAuth} from "../auth";

const Home = withAuth(({ auth }) => {

    const [authenticated, user] = useAuth(auth);
    const [books, setBooks] = useState([]);
    let growl = new Growl();

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
        };
        fetchBooks();
    }, []);

    function checkOutBook(book, i) {
        if (user) {
            axios.put("http://localhost:8080/api/v1/books/" + book[i].isbn + "/checkout", user.email, {headers: {'Content-Type': 'text/plain'}})
                .then(() => {
                    book[i].status = "CHECKED_OUT";
                    book[i].checkedOutBy = user.email;
                    setBooks(currentBooks => ([...currentBooks]));
                });
        } else {
            growl.show({severity: 'error', summary: 'Error', detail: 'You must be logged in to check out books.', sticky: true});
        }
    }

    return(
        <div>
            <Menu/>
            <Growl ref={(el) => growl = el} />
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
                            {book[i].status === "ON_SHELF" && <Button label="Checkout" onClick={() => checkOutBook(book, i)}/>}
                            {book[i].status === "CHECKED_OUT" && <Message severity="warn" text="Checked Out"/>}
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
});

export default Home;