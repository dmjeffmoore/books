import React from 'react';

function Footer() {
    return(
        <footer>
            <div id="footer">
                <small>
                    Copyright &copy; {new Date().toISOString().substr(0,4)}
                </small>
            </div>
        </footer>
    )
}

export default Footer;