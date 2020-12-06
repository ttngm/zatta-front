import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import Result from './Result';


function Home() {
    return (
        <div className="app-main">
            <Sidebar />
            <Result />
        </div>
    );
}

export default Home;