import React, { Component } from 'react';
import './App.css';
import GithubProfile from './components/githubProfile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Namma Bengaluru GitHub Community..!!!</h1>
        <GithubProfile />
      </div>
    );
  }
}

export default App;
