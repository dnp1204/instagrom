import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, followUser } from '../actions';
import Post from './Utils/Post';
import { ModalBody, Modal } from 'react-bootstrap';
import Media from 'react-media';

const MAX_LENGTH_NAME = 15;

class Profile extends Component {
  state = { show: false };

  componentWillMount() {
    const { id } = this.props.match.params;
    if (this.props.user.following.includes(id)) {
      this.setState({ following: true });
    }
  }

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

  close() {
    this.setState({ show: false });
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
        <div key={post._id} className="post col col-md-4 col-sm-4 col-xs-4">
          <Post
            visitedUserId={id}
            userId={_id}
            postId={post._id}
            likes={post.likes}
            comments={post.comments.length}
            imageURL={post.image}
            handleDisplayModalImage={this.handleDisplayModalImage.bind(this)}
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
      <a className="btn btn-danger" href="/api/logout">
        Log out
      </a>
    );
  }

  handleFollowUser() {
    const { id } = this.props.match.params;
    this.props.followUser(id);
    this.setState({ following: !this.state.following });
  }

  renderFollow() {
    // const { id } = this.props.match.params;
    if (this.state.following) {
      return (
        <button
          onClick={this.handleFollowUser.bind(this)}
          className="btn btn-primary"
        >
          Following
        </button>
      );
    }

    return (
      <button
        onClick={this.handleFollowUser.bind(this)}
        className="btn btn-primary"
      >
        Follow
      </button>
    );
  }

  handleDisplayModalImage(likes, comments, imageURL, postId) {
    this.setState({ show: true, likes, comments, imageURL, postId });
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
    const name = firstName + ' ' + lastName;

    return (
      <div className="profile-container">
        <div className="user-container">
          <div className="user-avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="user-info">
            <div className="name">
              <Media query="(max-width: 390px)">
                {matches =>
                  matches ? (
                    <h4 className="bigger">
                      {name.length > MAX_LENGTH_NAME ? firstName : name}
                    </h4>
                  ) : (
                    <h4 className="bigger">{name}</h4>
                  )}
              </Media>
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
        {this.renderPosts()}
        <Modal
          dialogClassName="modal-container"
          show={this.state.show}
          onHide={this.close.bind(this)}
        >
          <ModalBody>
            <div className="image-container">
              <img alt={this.state.imageURL} src={this.state.imageURL} />
            </div>
            <div className="image-detail">
              <div className="image-user">
                <img src={avatar} alt={name} />
                <div>{name}</div>
              </div>
              <div className="image-comments" />
              <div className="image-info" />
              <div className="image-comment-input" />
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, followUser })(Profile);
