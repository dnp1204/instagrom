import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import LoginPage from './LoginPage';
import Header from './Header';

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    console.log(this.props.user);
    if (this.props.user) {
      return (
        <div>
          <Header />
        </div>
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
