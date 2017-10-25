import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const { firstName, lastName, avatar, posts, following, followers } = this.props.user;

    return (
      <div className="profile-container">
        <div className="user-container">
          <div className="user-avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="user-info">
            <h4 className="bigger">{firstName} {lastName}</h4>
            <div className="numbers">
              <p><span className="bigger">{posts.length}</span> posts</p>
              <p><span className="bigger">{following.length}</span> following</p>
              <p><span className="bigger">{followers.length}</span> followers</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Profile);
