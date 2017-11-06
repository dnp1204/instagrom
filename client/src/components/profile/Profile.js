import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalBody, Modal } from 'react-bootstrap';
import moment from 'moment';
import {
  fetchPosts,
  followUser,
  likePost,
  deletePost,
  deleteComment,
  commentPost,
  followUserFromList
} from '../../actions';
import PostList from './PostList';
import NumbersMobile from './NumbersMobile';
import UserList from './UserList';
import UserInfo from './UserInfo';

const MAX_COMMENT_LENGTH = 5;

class Profile extends Component {
  state = {
    showModalDetail: false,
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
    if (this.props.user.following.includes(id)) {
      this.setState({ following: true });
    }
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
      this.props.commentPost(this.state.content, this.props.selectPost.postId);
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
    this.setState({ showModalDetail: false, hideComment: true });
  }

  closeListModal() {
    this.setState({ showListModal: false });
  }

  openListModal(userList, titleModal) {
    this.setState({ showListModal: true, userList, titleModal });
  }

  renderLessComments() {
    const { comments, postId } = this.props.selectPost;
    const LOWER_BOUNDS = comments.length - MAX_COMMENT_LENGTH;
    return comments.slice(LOWER_BOUNDS, comments.length).map(comment => {
      return (
        <div className="comment-content" key={comment._id}>
          <div>
            <span>{comment.user.fullName} </span>
            {comment.content}
          </div>
          {comment.user._id === this.props.user._id ? (
            <div>
              <i
                onClick={() => this.props.deleteComment(postId, comment._id)}
                className="fa fa-times"
                aria-hidden="true"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      );
    });
  }

  renderComments() {
    const { comments, postId } = this.props.selectPost;
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
          <div>
            <span>{comment.user.fullName} </span>
            {comment.content}
          </div>
          {comment.user._id === this.props.user._id ? (
            <div>
              <i
                onClick={() => this.props.deleteComment(postId, comment._id)}
                className="fa fa-times"
                aria-hidden="true"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      );
    });
  }

  handleFollowUser() {
    const { id } = this.props.match.params;
    this.props.followUser(id);
    this.setState({ following: !this.state.following });
  }

  handleOnChange(event) {
    this.setState({ content: event.target.value });
  }

  handleLikeClick() {
    const { id } = this.props.match.params;
    this.props.likePost(this.props.selectPost.postId, id);
  }

  handleDelete() {
    const result = window.confirm(
      'Do you want to delete this post ? Once you did, you cannot undo it'
    );
    if (result) {
      this.props.deletePost(this.props.selectPost.postId);
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

    const { selectPost } = this.props;

    const name = firstName + ' ' + lastName;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="profile-container">
              <UserInfo
                avatar={avatar}
                name={name}
                firstName={firstName}
                id={id}
                posts={posts}
                followers={followers}
                following={following}
                openListModal={(userList, titleModal) =>
                  this.openListModal(userList, titleModal)}
                isFollowing={this.state.following}
                handleFollowUser={this.handleFollowUser.bind(this)}
              />
              <NumbersMobile
                posts={posts}
                following={following}
                followers={followers}
              />
              <PostList
                posts={posts}
                user={this.props.user}
                visitedUserId={id}
                displayModalDetail={() =>
                  this.setState({ showModalDetail: true })}
              />
              <Modal
                dialogClassName="modal-container"
                show={this.state.showModalDetail}
                onHide={this.close.bind(this)}
              >
                <ModalBody>
                  <div className="image-container">
                    <img alt={selectPost.imageURL} src={selectPost.imageURL} />
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
                            className={`fa fa-heart-o ${selectPost.isLiked
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
                        <div> {selectPost.likes.length} likes</div>
                        <div className="date">
                          {moment(selectPost.createdAt).format('MMMM Do YYYY')}
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
                currentUser={this.props.user}
                followUser={userId => this.props.followUserFromList(userId, id)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, posts: state.posts, selectPost: state.selectPost };
}

export default connect(mapStateToProps, {
  fetchPosts,
  followUser,
  likePost,
  deletePost,
  deleteComment,
  commentPost,
  followUserFromList
})(Profile);
