import React, { Component } from 'react';

class Header extends Component {
  
  render() {
    return (
      <div className="header-container">
        <div className="header-brand">
          <div className="camera-logo"><i className="fa fa-camera fa-2x"></i></div>
          <h1 className="logo">Instagram</h1>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Searching" />
        </div>
        <div className="header-summary">
          <div className="notification"><i className="fa fa-heart fa-2x"></i></div>
          <div className="user-info"><i className="fa fa-user fa-2x"></i></div>
        </div>
      </div>
    );
  }
}

export default Header;