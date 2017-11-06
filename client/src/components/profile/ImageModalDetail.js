import React, { Component } from 'react';
import { ModalBody, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  likePost,
  deletePost,
  deleteComment,
  commentPost
} from '../../actions';

const MAX_COMMENT_LENGTH = 5;

class ImageModalDetail extends Component {
  state = { hideComment: true, content: '' };

  componentDidMount() {
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

  handleLikeClick() {
    const { id } = this.props;
    this.props.likePost(this.props.selectPost.postId, id);
  }

  handleDelete() {
    const { closeModalDetail } = this.props;
    const result = window.confirm(
      'Do you want to delete this post ? Once you did, you cannot undo it'
    );
    if (result) {
      this.props.deletePost(this.props.selectPost.postId);
      closeModalDetail();
    }
  }

  handleOnChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    const { showModalDetail, closeModalDetail, avatar, name, id } = this.props;
    const { selectPost } = this.props;

    return (
      <Modal
        dialogClassName="modal-container"
        show={showModalDetail}
        onHide={() => {
          closeModalDetail();
          this.setState({ hideComment: true });
        }}
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
            <div className="image-comments">{this.renderComments()}</div>
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
    );
  }
}

function mapStateToProps(state) {
  return { selectPost: state.selectPost, user: state.user };
}

export default connect(mapStateToProps, {
  likePost,
  deletePost,
  deleteComment,
  commentPost
})(ImageModalDetail);
