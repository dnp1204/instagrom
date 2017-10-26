import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchCurrentUser } from '../actions';
import LoginPage from './LoginPage';
import Header from './Header';
import Profile from './Profile';
import Newsfeed from './Newsfeed';

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    if (this.props.user) {
      return (
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <Route path="/" exact component={Newsfeed} />
                  <Route path="/profile" exact component={Profile} />
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      );
    }
    return (
      <div className="app-login-page">
        <LoginPage />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
