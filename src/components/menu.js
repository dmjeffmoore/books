import React from 'react';
import {MegaMenu} from "primereact/megamenu";

function Menu() {

    const items = [
        {
            label: 'Jeff', icon: 'pi pi-fw pi-cog',
            items: [[{items: [
                    {label: 'Return Books', command:() => {}},
                    {label: 'Logout'}
            ]}]]
        },
    ];

    return(
        <div>
            <MegaMenu model={items} orientation="horizontal" style={{float: "right", marginRight: "80px"}}/>
        </div>
    )
}

export default Menu;