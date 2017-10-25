import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  
  render() {
    const { firstName, lastName } = this.props.user;

    return (
      <div>{firstName} {lastName}</div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Profile);