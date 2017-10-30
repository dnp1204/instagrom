import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalBody, Modal } from 'react-bootstrap';
import moment from 'moment';
import Media from 'react-media';
import { fetchPosts, followUser, likePost, deletePost } from '../../actions';
import Post from './Post';
import NumbersMobile from './NumbersMobile';
import UserList from './UserList';

const MAX_LENGTH_NAME = 15;
const MAX_COMMENT_LENGTH = 5;

class Profile extends Component {
  state = {
    show: false,
    hideComment: true,
    comments: [],
    likes: [],
    content: '',
    showListModal: false,
    userList: [],
    titleModal: ''
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchPosts(id);
    } else {
      this.props.fetchPosts();
    }
    document.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    if (event.charCode === 13 && this.state.content) {
      this.setState({ content: '' });
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
    this.setState({ show: false, hideComment: true });
  }

  closeListModal() {
    this.setState({ showListModal: false });
  }

  openListModal(userList, titleModal) {
    this.setState({ showListModal: true, userList, titleModal });
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
            createdAt={post.createdAt}
            visitedUserId={id}
            userId={_id}
            postId={post._id}
            likes={post.likes}
            comments={post.comments}
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

  handleDisplayModalImage(
    likes,
    comments,
    imageURL,
    postId,
    createdAt,
    isLiked
  ) {
    this.setState({
      show: true,
      likes,
      comments,
      imageURL,
      postId,
      createdAt,
      isLiked
    });
  }

  renderLessComments() {
    const { comments } = this.state;
    const LOWER_BOUNDS = comments.length - MAX_COMMENT_LENGTH;
    return comments.slice(LOWER_BOUNDS, comments.length).map(comment => {
      return (
        <div className="comment-content" key={comment._id}>
          <span>{comment.user.fullName} </span>
          {comment.content}
        </div>
      );
    });
  }

  renderComments() {
    const { comments } = this.state;
    if (comments.length > MAX_COMMENT_LENGTH && this.state.hideComment) {
      return (
        <div>
          <div
            onClick={() => this.setState({ hideComment: false })}
            id="view-more"
          >
            Views all comments
          </div>
          {this.renderLessComments()}
        </div>
      );
    }

    return comments.map(comment => {
      return (
        <div className="comment-content" key={comment._id}>
          <span>{comment.user.fullName} </span>
          {comment.content}
        </div>
      );
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

  handleOnChange(event) {
    this.setState({ content: event.target.value });
  }

  handleLikeClick() {
    const { id } = this.props.match.params;

    let newLikesList = this.state.likes;
    if (this.state.isLiked) {
      for (let i = 0; i < newLikesList.length; i++) {
        if (newLikesList[i]._id === this.props.posts._id) {
          newLikesList.splice(i, 1);
          break;
        }
      }
    } else {
      newLikesList.push(this.props.posts);
    }

    this.setState({ isLiked: !this.state.isLiked, likes: newLikesList });
    this.props.likePost(this.state.postId, id);
  }

  handleDelete() {
    const result = window.confirm(
      'Do you want to delete this post ? Once you did, you cannot undo it'
    );
    if (result) {
      this.props.deletePost(this.state.postId);
      this.setState({ show: false });
    }
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
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
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
                    <p
                      onClick={() => this.openListModal(following, 'Following')}
                      id="showList"
                    >
                      <span className="bigger">{following.length}</span>{' '}
                      following
                    </p>
                    <p
                      onClick={() => this.openListModal(followers, 'Followers')}
                      id="showList"
                    >
                      <span className="bigger">{followers.length}</span>{' '}
                      followers
                    </p>
                  </div>
                </div>
              </div>
              <NumbersMobile
                posts={posts}
                following={following}
                followers={followers}
              />
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
                    <div className="image-comments">
                      {this.renderComments()}
                    </div>
                    <div className="image-info">
                      <div className="section image-function">
                        <div>
                          <i
                            onClick={() => this.handleLikeClick()}
                            className={`fa fa-heart-o ${this.state.isLiked
                              ? 'liked'
                              : ''}`}
                          />
                          <i
                            onClick={() => this.commentInput.focus()}
                            className="fa fa-comment-o"
                          />
                        </div>
                        {id ? (
                          <div />
                        ) : (
                          <div>
                            <i
                              onClick={() => this.handleDelete()}
                              className="fa fa-trash-o"
                            />
                          </div>
                        )}
                      </div>
                      <div className="section total-likes">
                        <div> {this.state.likes.length} likes</div>
                        <div className="date">
                          {moment(this.state.createdAt).format('MMMM Do YYYY')}
                        </div>
                      </div>
                    </div>
                    <div className="image-comment-input">
                      <input
                        ref={input => {
                          this.commentInput = input;
                        }}
                        value={this.state.content}
                        onChange={this.handleOnChange.bind(this)}
                        placeholder="Add a comment..."
                      />
                    </div>
                  </div>
                </ModalBody>
              </Modal>
              <UserList
                title={this.state.titleModal}
                showModal={this.state.showListModal}
                closeModal={this.closeListModal.bind(this)}
                userList={this.state.userList}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, posts: state.posts };
}

export default connect(mapStateToProps, {
  fetchPosts,
  followUser,
  likePost,
  deletePost
})(Profile);
