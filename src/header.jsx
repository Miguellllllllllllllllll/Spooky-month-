import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark justify-content-center">
            <a className="navbar-brand" href="#">
                <img src="/FNF-Logo.svg.png" width="240" height="160" className="logod-inline-block align-top" alt="Friday Night Funkin Logo"></img>
            </a>
        </nav>
    );
}

export default Header;
