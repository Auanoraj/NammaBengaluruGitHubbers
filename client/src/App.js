import React, { Component } from 'react';
import GithubProfile from './components/githubProfile';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <GithubProfile />
      </div>
    );
  }
}

export default App;
