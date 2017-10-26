import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import Post from './Utils/Post';

class Profile extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {}

  render() {
    const {
      _id,
      firstName,
      lastName,
      avatar,
      following,
      followers
    } = this.props.user;
    const { posts } = this.props.posts;
  
    return (
      <div className="profile-container">
        <div className="user-container">
          <div className="user-avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="user-info">
            <div className="name">
              <h4 className="bigger">
                {firstName} {lastName}
              </h4>
              <a href="/api/logout"><i className="fa fa-sign-out fa-2x"></i></a>
            </div>
            <div className="numbers">
              <p>
                <span className="bigger">{posts.length}</span> posts
              </p>
              <p>
                <span className="bigger">{following.length}</span> following
              </p>
              <p>
                <span className="bigger">{followers.length}</span> followers
              </p>
            </div>
          </div>
        </div>
        <div className="row user-post">
          <div className="col-md-4 col-sm-4 col-xs-4">
            <Post
              userId={_id}
              postId={posts[0]._id}
              likes={posts[0].likes}
              comments={posts[0].comments.length}
              imageURL={posts[0].image}
            />
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <Post
              postId={posts[0]._id}
              likes={posts[0].likes}
              comments={posts[0].comments.length}
              imageURL={posts[0].image}
            />
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <Post
              postId={posts[0]._id}
              likes={posts[0].likes}
              comments={posts[0].comments.length}
              imageURL={posts[0].image}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(Profile);
