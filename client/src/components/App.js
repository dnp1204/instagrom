import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import LoginPage from './LoginPage';

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    if (this.props.user) {
      return <div>Hello</div>  
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
