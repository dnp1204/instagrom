import React, { Component } from 'react';

class LoginPage extends Component {
  state = { hidden: 'hidden' }

  componentWillMount() {
    let that = this;
    setTimeout(function() {
      that.setState({ hidden: '' });
    }, 100);
  }

  render() {
    return (
      <div className={`app-login-page ${this.state.hidden}`}>
        <div className="login-page-container">
          <h1 className="logo">Instagram</h1>
          <a
            href="/auth/google"
            className="btn btn-block btn-danger"
            id="google-login-link"
          >
            <i className="fa fa-google" /> Log in with Google
          </a>
          <div className="split-line-container">
            <div className="split-line" />
            <div className="between">OR</div>
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
      </div>
    );
  }
}

export default LoginPage;
