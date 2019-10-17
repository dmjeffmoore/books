import React, { useState } from 'react';
import { withAuth } from '@okta/okta-react';

import { MegaMenu } from "primereact/megamenu";
import { Button } from "primereact/button";

import { useAuth } from "./auth";

const Menu = withAuth(({ auth }) => {

    const [authenticated, user] = useAuth(auth);

    const menuItems = [
        {
            label: user != null ? user.given_name : "", icon: 'pi pi-fw pi-cog',
            items: [[{
                items: [
                    {
                        label: 'Checked Out Books', command: () => {
                            // TODO
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

    return (
        <div>
            {authenticated ? (
                <MegaMenu model={menuItems} orientation="horizontal" style={{float: "right", marginRight: "80px"}}/>
            ) : (
                <Button label="Login" onClick={() => auth.login("/")} style={{float: "right", marginRight: "80px"}}/>
            )}
        </div>
    )
});

export default Menu;