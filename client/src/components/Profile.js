import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import Post from './Utils/Post';

class Profile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchPosts(id);
    } else {
      this.props.fetchPosts();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      this.props.fetchPosts(this.props.match.params.id);
    }
  }

  renderPostRow(index) {
    const { posts: { posts }, user: { _id } } = this.props;
    const { id } = this.props.match.params;

    let validPost = [];
    let max = 0;
    if (index + 3 < posts.length) {
      max = index + 3;
    } else {
      max = posts.length;
    }

    for (index; index < max; index += 1) {
      validPost.push(posts[index]);
    }

    return validPost.map(post => {
      return (
        <div key={post._id} className="col-md-4 col-sm-4 col-xs-4">
          <Post
            visitedUserId={id}
            userId={_id}
            postId={post._id}
            likes={post.likes}
            comments={post.comments.length}
            imageURL={post.image}
          />
        </div>
      );
    });
  }

  renderPosts() {
    return this.props.posts.posts.map((post, index) => {
      if (index % 3 === 0) {
        return (
          <div key={index} className="row user-post">
            {this.renderPostRow(index)}
          </div>
        );
      } else {
        return '';
      }
    });
  }

  renderLogout() {
    return (
      <a href="/api/logout">
        <i className="fa fa-sign-out fa-2x" />
      </a>
    );
  }

  renderFollow() {
    return (
      <button className="btn btn-primary">Follow</button>
    )
  }

  render() {
    const { id } = this.props.match.params;
    
    const {
      firstName,
      lastName,
      avatar,
      following,
      followers,
      posts
    } = this.props.posts;

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
              {id ? this.renderFollow() : this.renderLogout()}
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
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(Profile);
