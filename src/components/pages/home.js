import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withAuth } from "@okta/okta-react";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import { Message } from "primereact/message";
import { Growl } from 'primereact/growl';
import {Dialog} from "primereact/dialog";
import {MegaMenu} from "primereact/megamenu";

import {useAuth} from "../auth";

const Home = withAuth(({ auth }) => {

    const [authenticated, user] = useAuth(auth);
    const [books, setBooks] = useState([]);
    const [isDialogVisible, showDialog] = useState(false);

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

    async function returnBook(book, i) {
        axios.put("http://localhost:8080/api/v1/books/" + book[i].isbn + "/return")
            .then(() => {
                book[i].status = "ON_SHELF";
                book[i].checkedOutBy = "";
                setBooks(currentBooks => ([...currentBooks]));
            });
    }

    const menuItems = [
        {
            label: user != null ? user.given_name : "", icon: 'pi pi-fw pi-cog',
            items: [[{
                items: [
                    {
                        label: 'Checked Out Books', command: async () => {
                            showDialog(true);
                        }
                    },
                    {
                        label: 'Logout', command: () => {
                            auth.logout("/");
                        }
                    }
                ]
            }]]
        },
    ];

    return(
        <div>
            <div>
                <Dialog header="Checked Out Books" visible={isDialogVisible} style={{width: '60vw'}} modal={true} onHide={() => showDialog(false)}>
                    {books.map((book, i) =>
                        user && book[i].checkedOutBy === user.email &&
                        <p key={book[i].id}>
                            Title: <b>{book[i].title}</b>
                            <br/>
                            Author: {book[i].author}
                            <br/>
                            ISBN: {book[i].isbn}
                            <br/>
                            <Button label="Return" onClick={() => returnBook(book, i)}/>
                        </p>
                    )}
                </Dialog>
                {authenticated ? (
                    <MegaMenu model={menuItems} orientation="horizontal" style={{float: "right", marginRight: "80px"}}/>
                ) : (
                    <Button label="Login" onClick={() => auth.login("/")} style={{float: "right", marginRight: "80px"}}/>
                )}
            </div>
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