import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import RegistKeywordPage from './RegistKeywordPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path='/' component={Home} />
        <Route path='/registKeyword' component={RegistKeywordPage} />
      </Router>
    </div>
  );
}

export default App;
