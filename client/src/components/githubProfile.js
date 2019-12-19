import React, { Component } from 'react';

import Pagination from './pagination';
import LoadSpinner from './loadSpinner';
import { Repositories, Followers, Search, GithubLogo, Logo } from '../assets/images'

class GithubProfile extends Component {
  state = {
    activePage: 1,
    users: [],
    searchedUsers: [],
    searchBtnClicked: false,
    loadSpinner: true
  }

  componentDidMount = () => {
    this.setState({ loadSpinner: true })
    this.fetchUsersData(this.state.activePage)
  };

  fetchUsersData = (pageNumber) => {
    const { searchText, searchBtnClicked } = this.state;

    this.setState({ loadSpinner: true })

    const hitAPI =(updatedPageNumber) => {
      
      let allUsersURL = `/github/allUsers/${updatedPageNumber}`, searchUserURL = `/github/user/${searchText}/${updatedPageNumber}`;

      if (searchBtnClicked) URL = searchUserURL;
      else URL = allUsersURL;

      fetch(URL)
      .then(res => res.json())
      .then(data => {
          this.setState({ 
            activePage: updatedPageNumber,
            totalCount: data.totalCount,
            users: data.userData ,
            loadSpinner: false
          });
        })
      .catch(err => console.log(err));
    }

    if (typeof pageNumber === 'number') hitAPI(pageNumber)
    else if (pageNumber === "Previous") hitAPI(this.state.activePage - 1)
    else if (pageNumber === "Next") hitAPI(this.state.activePage + 1)
    else if (!pageNumber) hitAPI(1)

  }

  handleTextInputOrSearchBtn = (typeOfbtnClicked) => {
    const { activePage, searchText } = this.state;

    if (!!searchText) {
      fetch(`/github/user/${searchText}/${activePage}`)
      .then(res => res.json())
      .then(user => {
        if (typeOfbtnClicked === "Enter" || typeOfbtnClicked === "Search") {
          this.setState({
            totalCount: user.totalCount,
            users: user.userData,
            usersListHideOrShow: "hide",
            loadSpinner: false
          })
          this.refs.searchInput.value = ""
        } 
        else {
          this.setState({
            searchedUsers: user.userData
          })
        }
      })
      .catch(err => console.log(err))
    }
  };

  returnSearchedUsers = () => {
    return (
      this.state.searchedUsers.map((user, i) => {
        return (
          <div key={i} className="search-list-container">
            <ul className="list-group">
              <li 
                className="list-group-item"
                onClick={() => {
                  let dummyArray = [];
                  dummyArray.push(user)

                  this.setState({ 
                    users: dummyArray,
                    usersListHideOrShow: "hide",
                    totalCount: 0
                  })

                  this.refs.searchInput.value=""
                }}
              >
                <img
                  className="rounded-circle"
                  src={user.avatar_url}
                  alt={user.login}
                  style={{ width: '60px', marginRight: '5px' }}
                />
                {user.name}
              </li>
            </ul>
          </div>
        )
      })
    )
  }

  handleNavbar = () => {
    return (
      <div className="row navbar fixed-top">
        <div className="logo-container">
          <div
            onClick={async () => {
              await this.setState({ 
                searchBtnClicked: false,
                usersListHideOrShow: "hide"
              })
              this.fetchUsersData()
            }}
          >
            <Logo />
          </div>

          <div className="logo-title text-left">
            <h2 className="heading-tag">Namma Bengaluru</h2>
            <p>GitHub Community</p>
          </div>
        </div>
        
        <div className="col-6 input-group">
          <input 
            ref="searchInput"
            type="text" 
            className="form-control" 
            placeholder="Search by Github Username" 
            onChange={async (e) => { 
              await this.setState({ 
                searchText: e.target.value,
                usersListHideOrShow: "show"
              })
            }}
            onKeyDown={(e) => {
              if(e.key === "Enter") this.setState({ loadSpinner: true })
              this.handleTextInputOrSearchBtn(e.key)
            }}
          />

          <div className="input-group-append">
            <button 
              className="search-btn" 
              type="button"
              onClick={() => {
                this.handleTextInputOrSearchBtn("Search")
                this.setState({ 
                  searchBtnClicked: true,
                  loadSpinner: true
                })
              }}
            >
              <Search />
            </button>
          </div>
        </div>

      </div>
    )
  }

  handleUserName = (user) => {
    if (!!user.name) {
      return (
        <h3 className="text-capitalize mt-4">
          {user.name} (<a href={user.html_url} target="_blank">@{user.login}</a>)
        </h3>
      )
    }
    else {
      return (
        <h3 className="text-capitalize mt-4">
          {user.login}
        </h3>
      )
    }

  }

  handleInitialData = () => {
    
    const { loadSpinner, users } = this.state;

    const userItems = users.map((user, i) => {
      if (i % 2 === 0) {
        return (
          <div key={user.id} className="card card-body">
            <div className="row">
              <div className="mx-5">
                <img
                    className="rounded-circle"
                    src={user.avatar_url}
                    alt={user.login}
                    style={{ width: '200px' }}
                />
              </div>
    
              <div className="col-md-6 text-left">
                {this.handleUserName(user)}
    
                <div className="mt-4">
                  <Repositories />
                  <a className="p-3">{user.public_repos}</a>
                  <Followers />
                  <a className="p-2">{user.followers}</a>
                </div>

                <div className="mt-3">
                  <GithubLogo />
                  <a className="p-3" href={user.html_url} target="_blank" >
                    <u>{user.html_url}</u>
                  </a>
                </div>
              </div>
    
            </div>  
          </div>
        )
      }

      else {
        return (
          <div key={user.id} className="card card-body">
            <div className="row">
    
              <div className="col text-right">
                {this.handleUserName(user)}
    
                <div className="mt-4">
                  <Repositories />
                  <a className="p-3">{user.public_repos}</a>
                  <Followers />
                  <a className="p-2">{user.followers}</a>
                </div>
    
                <div className="mt-3">
                  <GithubLogo />
                  <a className="p-3" href={user.html_url} target="_blank" >
                    <u>{user.html_url}</u>
                  </a>
                </div>
              </div>

              
              <div className="mx-5">
                <img
                    className="rounded-circle"
                    src={user.avatar_url}
                    alt={user.login}
                    style={{ width: '200px' }}
                />
              </div>
    
            </div>  
          </div>
        )
      }
      
    });

    if (users.length !== 0 && !loadSpinner) {
      return (
        <div className="main-container">
          {this.handleNavbar()}
          <div className={this.state.usersListHideOrShow}>
            {this.returnSearchedUsers()}
          </div>
          <div 
            className="user-container"
            onClick={() => {
              this.setState({ 
                usersListHideOrShow: "hide", 
                searchText: null 
              })
              this.refs.searchInput.value=""
            }}  
          >
            {userItems}
            <Pagination 
              currentPage={this.state.activePage}
              totalCount={this.state.totalCount} 
              parentMethod={this.fetchUsersData}
            />
          </div>
        </div>
      )
    }

    else {
      return <LoadSpinner />
    }
  }

  render() {
    return this.handleInitialData()
  }
}

export default GithubProfile;