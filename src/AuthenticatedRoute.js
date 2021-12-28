import React from 'react';
import Header from './Header';
import Home from './Home';
import RegistKeywordPage from './RegistKeywordPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function AutenticatedRoute() {
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

export default AutenticatedRoute;
