import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

class GithubProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      repos: [],
      text: ''
    }
  }

  componentDidMount() {
    fetch('/github/result')
      .then(res => res.json())
      .then(data => {
          console.log(data);
          this.setState({ repos: data });
        })
      .catch(err => console.log(err));
  }

  onPageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  onTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <img
                className="rounded-circle"
                src={repo.avatar_url}
                alt={repo.login}
                style={{ width: '150px', marginRight: '5px' }}
            />
            <h4>
                {repo.login}
            </h4>
          </div>
          <div className="col-md-6">
            <h5>
              <span className="badge badge-primary mr-1">
                Address: {repo.html_url}
              </span>
              <span className="badge badge-info mr-1">
                Repos: {repo.repos_url}
              </span>
              <span className="badge badge-secondary mr-1">
                Followers: {repo.followers_url}
              </span>
            </h5> 
          </div>
        </div>  
      </div>
    ));
    return (
      <div>
        <h4 className="mb-4">Bengaluru based Github user's:</h4>
          <input
              type="text"
              className="text-input"
              placeholder="Search User's"
              onChange={this.onTextChange}
            />    
        {repoItems}
          <div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemPerPage}
              totalItemsCount={this.state.repos.length}
              pageRangeDisplayed={5}
              onChange={this.onPageChange.bind(this)}
            />
          </div>
      </div>
    )
  }
}

export default GithubProfile;
