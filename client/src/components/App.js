import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import Home from './Home';

class App extends Component {
  componentWillMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <Home />
    );
  }
}

export default connect(null, { fetchCurrentUser })(App);
