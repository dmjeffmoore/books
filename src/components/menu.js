import React, { useState } from 'react';
import { MegaMenu } from "primereact/megamenu";
import { Dialog } from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import axios from "axios";

function Menu() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    const [loginDialogVisible, setLoginDialogVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const menuItems = [
        {
            label: 'Jeff', icon: 'pi pi-fw pi-cog',
            items: [[{items: [
                    {label: 'Return Books', command:() => {

                        }},
                    {label: 'Logout', command:() => {
                        setLoggedIn(false);
                        }}
            ]}]]
        },
    ];

    return(
        <div>
            {loggedIn ? (
                <MegaMenu model={menuItems} orientation="horizontal" style={{float: "right", marginRight: "80px"}}/>
                ) : (
                <Button label="Login" onClick={() => {setLoginDialogVisible(true)}} style={{float: "right", marginRight: "80px"}}/>
            )}


            <Dialog header="Login" visible={loginDialogVisible} style={{width: '20vw'}} onHide={() => {setLoginDialogVisible(false)}}>
                Email
                <br/>
                <InputText onChange={e => setEmail(e.target.value)} />
                <br/><br/>
                Password
                <br/>
                <Password onChange={e => setPassword(e.target.value)} feedback={false} />
                <br/><br/>
                <Button label="Login" onClick={() => {
                    console.log(JSON.stringify(email + " " + password));
                    setLoginDialogVisible(false);
                    setLoggedIn(true);
                }}/>
            </Dialog>
        </div>
    )
}

// function login(loginDetails) {
//     // axios.post(
//     //     "http://localhost:8080/api/v1/login",
//     //     {headers: {auth: {username: loginDetails.get(email), password: loginDetails.get(password)}}})
//     //     .then(() => {
//     //         setLoggedIn(true);
//     //     })
//     //     .catch(() => {
//     //         setFailedLogin(true);
//     //     });
//     console.log("wooo" + loginDetails);
//     // if (loginDetails.get("email") === "Jeff") {
//     //     setLoggedIn(true);
//     // }
// }

export default Menu;