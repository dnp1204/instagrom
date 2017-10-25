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
    if (this.props.user) {
      return (
        <div>
          <Header />
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <LoginPage />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
