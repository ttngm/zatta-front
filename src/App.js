import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Result from './Result';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-main">
        <Sidebar />
        <Result />
      </div>
    </div>
  );
}

export default App;
