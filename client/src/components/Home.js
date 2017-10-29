import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Header from './header/Header';
import Profile from './profile/Profile';
import Newsfeed from './newsfeed/Newsfeed';

class Home extends Component {
  authRoute() {
    return (
      <div>
        <Header />
        <div className="app-container">
          <Route path="/" exact component={Newsfeed} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/:id" exact component={Profile} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.user._id ? (
          this.authRoute()
        ) : (
          <Route path="/" exact component={LoginPage} />
        )}
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
