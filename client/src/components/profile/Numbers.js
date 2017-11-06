import React from 'react';
import PropTypes from 'prop-types';

const Numbers = ({ posts, following, followers, openListModal }) => {
  return (
    <div className="numbers">
      <p>
        <span className="bigger">{posts.length}</span> posts
      </p>
      <p
        onClick={() => openListModal(following, 'Following')}
        id="showList"
      >
        <span className="bigger">{following.length}</span> following
      </p>
      <p
        onClick={() => openListModal(followers, 'Followers')}
        id="showList"
      >
        <span className="bigger">{followers.length}</span> followers
      </p>
    </div>
  );
};

Numbers.propTypes = {
  posts: PropTypes.array,
  following: PropTypes.array,
  followers: PropTypes.array,
  openListModal: PropTypes.func
}

export default Numbers;
