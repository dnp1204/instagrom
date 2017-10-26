import React, { Component } from 'react';
import { connect } from 'react-redux';

class Newsfeed extends Component {

  render() {
    return (
      <div>
        <h1>Upload</h1>
      </div>
    );
  }
}

export default connect(null)(Newsfeed);
