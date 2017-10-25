import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-brand">
          <div className="camera-logo">
            <Link to="/">
              <i className="fa fa-camera-retro fa-2x" />
            </Link>
          </div>
          <Link className="logo" to="/">
            <h1 className="logo">Instagrom</h1>
          </Link>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Searching" />
        </div>
        <div className="header-summary">
          <div className="notification">
            <i className="fa fa-heart-o fa-2x" />
          </div>
          <div className="user-info">
            <Link to="/profile">
              <i className="fa fa-user-o fa-2x" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
