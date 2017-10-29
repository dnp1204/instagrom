import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchCurrentUser } from '../actions';
import LoginPage from './LoginPage';
import Header from './header/Header';
import Profile from './profile/Profile';
import Newsfeed from './newsfeed/Newsfeed';

class App extends Component {
  componentWillMount() {
    this.props.fetchCurrentUser();
  }

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

  noAuthRoute() {
    return <Route path="/" exact component={LoginPage} />;
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.user._id ? this.authRoute() : this.noAuthRoute()}
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
