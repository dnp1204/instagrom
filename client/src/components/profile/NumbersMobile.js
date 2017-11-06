import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NumbersMobile extends Component {
  render() {
    const { posts, following, followers } = this.props;
    
    return (
      <div className="numbers-mobile">
        <div className="section">
          <div>
            <span className="bigger">{posts.length}</span>
          </div>
          <div>posts</div>
        </div>
        <div className="section">
          <div>
            <span className="bigger">{following.length}</span>
          </div>
          <div>following</div>
        </div>
        <div className="section">
          <div>
            <span className="bigger">{followers.length}</span>{' '}
          </div>
          <div>followers</div>
        </div>
      </div>
    );
  }
}

NumbersMobile.propTypes = {
  posts: PropTypes.array,
  following: PropTypes.array,
  followers: PropTypes.array
}

export default NumbersMobile;
