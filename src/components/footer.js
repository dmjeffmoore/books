import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div id="footer">
                    <small>
                        Copyright &copy; {new Date().toISOString().substr(0,4)}
                    </small>
                </div>
            </footer>
        )
    }
}

export default Footer;