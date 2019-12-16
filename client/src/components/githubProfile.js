import React, { Component } from 'react';
import Pagination from './pagination';
import Axios from 'axios';

class GithubProfile extends Component {
  state = {
    activePage: 1,
    users: [],
    searchedUsers: [],
    searchBtnClicked: false
  }

  componentDidMount = () => this.fetchUsersData(this.state.activePage);

  fetchUsersData = async (pageNumber) => {

    const hitAPI = (updatedPageNumber) => {
      const { searchText, searchBtnClicked } = this.state;
      
      let allUsersURL = `/github/allUsers/${!!updatedPageNumber}`, searchUserURL = `/github/user/${searchText}/${updatedPageNumber}`;

      if (searchBtnClicked) URL = searchUserURL;
      else URL = allUsersURL;

      fetch(URL)
      .then(res => res.json())
      .then(data => {
          this.setState({ 
            activePage: updatedPageNumber,
            totalCount: data.total_count,
            users: data.items 
          });
        })
      .catch(err => console.log(err));
    }
    
    if (typeof pageNumber === 'number') hitAPI(pageNumber)
    else if (pageNumber === "Previous") hitAPI(this.state.activePage - 1)
    else if (pageNumber === "Next") hitAPI(this.state.activePage + 1)
    else if (!pageNumber) hitAPI(1)

  }

  handleTextInputOrSearchBtn = () => {
    const { activePage, searchBtnClicked, searchText } = this.state;

    fetch(`/github/user/${searchText}/${activePage}`)
    .then(res => res.json())
    .then((user) => {
      if (searchBtnClicked) {
        this.setState({
          totalCount: user.total_count,
          users: user.items,
          usersListHideOrShow: "hide" 
        })
      } 
      else {
        this.setState({
          searchedUsers: user.items
        })
      }
    })
    .catch(err => console.log(err))
  };

  handleSearch = () => {
  }

  returnSearchedUsers = () => {
    return (
      this.state.searchedUsers.map((user, i) => {
        return (
          <ul className="list-group" key={i}>
            <li 
              className="list-group-item"
              onClick={() => {
                let dummyArray = [];
                dummyArray.push(user)
                this.setState({ 
                  users: dummyArray,
                  usersListHideOrShow: "hide"
                })
              }}
            >
              <img
                className="rounded-circle"
                src={user.avatar_url}
                alt={user.login}
                style={{ width: '60px', marginRight: '5px' }}
              />
              {user.login}
            </li>
          </ul>
        )
      })
    )
  }

  render() {
    const { users } = this.state;

    const repoItems = users.map(repo => (
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
        <h1 
          onClick={async () => {
            await this.setState({ searchBtnClicked: false })
            this.fetchUsersData()
            this.refs.searchInput.value = ""
          }}
        >
          Welcome to Namma Bengaluru GitHub Community..!!!
        </h1>
        <h4 className="mb-4">Bengaluru based Github user's:</h4>
          <div className="input-group mb-3">
            <input 
              ref="searchInput"
              type="text" 
              className="form-control" 
              placeholder="Search by Github Username" 
              // aria-label="Github username" 
              aria-describedby="basic-addon2" 
              onChange={(e) => { 
                this.handleTextInputOrSearchBtn()
                this.setState({ 
                  searchText: e.target.value,
                  usersListHideOrShow: "show"
                })
              }}
            />
            <div className="input-group-append">
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={async () => {
                  await this.setState({ searchBtnClicked: true })
                  this.handleTextInputOrSearchBtn()
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className={this.state.usersListHideOrShow}>
            {this.returnSearchedUsers()}
          </div>
          {repoItems}
          <Pagination 
            currentPage={this.state.activePage}
            totalCount={this.state.totalCount} 
            parentMethod={this.fetchUsersData}
          />
      </div>
    )
  }
}

export default GithubProfile;