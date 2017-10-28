import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchFollowing,
  likeFollowingPost,
  commentFollowingPost
} from '../../actions';
import NewsfeedPost from './NewsfeedPost';

class Newsfeed extends Component {
  componentDidMount() {
    this.props.fetchFollowing();
  }

  renderPosts() {
    const { following, user } = this.props;
    return following.map(post => {
      let liked = false;
      for (let i = 0; i < post.likes.length; i++) {
        if (post.likes[i]._id === user._id) {
          liked = true;
          break;
        }
      }

      return (
        <NewsfeedPost
          key={post._id}
          liked={liked}
          userAvatar={post.userAvatar}
          userName={post.userName}
          imageLink={post.image}
          likes={post.likes}
          comments={post.comments}
          createdAt={post.createdAt}
          gotoUser={() => this.props.history.push(`/profile/${post.userId}`)}
          likeFollowingPost={() =>
            this.props.likeFollowingPost(
              post._id,
              post.userId,
              post.userName,
              post.userAvatar
            )}
          commentFollowingPost={content =>
            this.props.commentFollowingPost(
              content,
              post._id,
              post.userId,
              post.userName,
              post.userAvatar
            )}
        />
      );
    });
  }

  render() {
    return <div className="newsfeed-container">{this.renderPosts()}</div>;
  }
}

function mapStateToProps(state) {
  return { following: state.following, user: state.user };
}

export default connect(mapStateToProps, {
  fetchFollowing,
  likeFollowingPost,
  commentFollowingPost
})(Newsfeed);
