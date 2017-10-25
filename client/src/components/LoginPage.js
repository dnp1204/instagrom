import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page-container">
        <h1 className="logo">Instagram</h1>
        <a className="btn btn-block btn-danger" id="google-login-link" href="/">
          <i className="fa fa-google"></i>  Log in with Google
        </a>
        <div className="split-line-container">
          <div className="split-line" />
          <div>OR</div>
          <div className="split-line" />
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Email" />
          <input className="form-control" placeholder="First Name" />
          <input className="form-control" placeholder="Last Name" />
          <input className="form-control" placeholder="Password" />
          <input className="form-control" placeholder="Password Again" />
        </div>
        <button className="btn btn-block btn-primary">Sign Up</button>
      </div>
    );
  }
}

export default LoginPage;
