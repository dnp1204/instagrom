import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFollowing } from '../actions';
import NewsfeedPost from './Utils/NewsfeedPost';

class Newsfeed extends Component {
  componentDidMount() {
    this.props.fetchFollowing();
  }

  render() {
    const { following } = this.props;
    const post = following[0];
    console.log(post);
    return (
      <div className="newsfeed-container">
        <NewsfeedPost
          userAvatar={post.userAvatar}
          userName={post.userName}
          imageLink={post.image}
          likes={post.likes}
          comments={post.comments}
          createdAt={post.createdAt}
        />
        <NewsfeedPost
          userAvatar={post.userAvatar}
          userName={post.userName}
          imageLink={post.image}
          likes={post.likes}
          comments={post.comments}
          createdAt={post.createdAt}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { following: state.following };
}

export default connect(mapStateToProps, { fetchFollowing })(Newsfeed);
