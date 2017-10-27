import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFollowing } from '../actions';
import NewsfeedPost from './Utils/NewsfeedPost';

class Newsfeed extends Component {
  componentDidMount() {
    this.props.fetchFollowing();
  }

  renderPosts() {
    const { following } = this.props;
    return following.map(post => {
      return (
        <NewsfeedPost
          userAvatar={post.userAvatar}
          userName={post.userName}
          imageLink={post.image}
          likes={post.likes}
          comments={post.comments}
          createdAt={post.createdAt}
        />
      );
    });
  }

  render() {
    return (
      <div className="newsfeed-container">
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { following: state.following };
}

export default connect(mapStateToProps, { fetchFollowing })(Newsfeed);
