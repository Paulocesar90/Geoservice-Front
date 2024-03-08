import React from 'react';
import AddressComponent from './AddressComponent';
import CoordinatesComponent from './CoordinatesComponent';

const App = () => {
    return (
        <div>
            <h1>
    <img src="/assets/logoGE21gt-b21a44b1.png" alt="" /> Teste GRUPO GE21</h1>
            <h2>Paulo Cesar Pereira da Costa</h2>
            <AddressComponent />
            <CoordinatesComponent />
            <footer>
                <p className="footer-text">Criado por Paulo Cesar Pereira da Costa</p>
                <a href="https://github.com/Paulocesar90" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i> 
                </a>
            </footer>
        </div>
    );
};

export default App;
