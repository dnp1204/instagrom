import React, { Component } from 'react';
import moment from 'moment';

class NewsfeedPost extends Component {
  state = { content: '' };

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    if (event.charCode === 13 && this.state.content) {
      this.props.commentFollowingPost(this.state.content);
      this.setState({ content: '' });
    }
  }

  handleOnChange(event) {
    this.setState({ content: event.target.value });
  }

  renderLikes() {
    const { likes } = this.props;
    if (likes.length > 3) {
      return (
        <div className="like-section">
          Liked by <span>{likes[0].fullName}</span>,{' '}
          <span>{likes[1].fullName}</span>, <span>{likes[2].fullName}</span> and{' '}
          <span>{likes.length - 3} others</span>
        </div>
      );
    } else if (likes.length > 2) {
      return (
        <div className="like-section">
          Liked by <span>{`${likes[0].fullName}`}</span>
          <span>, {likes[1].fullName}</span> and{' '}
          <span>{likes[2].fullName}</span>
        </div>
      );
    } else if (likes.length > 0) {
      return (
        <div className="like-section">
          Liked by <span>{`${likes[0].fullName}`}</span>
          {likes[1] ? ' and ' : ''}
          {likes[1] ? <span>{likes[1].fullName}</span> : <div />}
        </div>
      );
    }
    return <div />;
  }

  renderComments() {
    const { comments } = this.props;
    return comments.map(comment => {
      return (
        <div key={comment._id}>
          <span>{comment.user.fullName} </span>
          {comment.content}
        </div>
      );
    });
  }

  render() {
    const {
      userAvatar,
      userName,
      imageLink,
      createdAt,
      gotoUser,
      liked,
      likeFollowingPost
    } = this.props;

    return (
      <div className="newsfeed-post-container">
        <div className="user-info-section">
          <img onClick={() => gotoUser()} alt={userName} src={userAvatar} />
          <div onClick={() => gotoUser()}>{userName}</div>
        </div>
        <img className="main-image" alt={userName} src={imageLink} />
        <div className="body-section">
          <div className="sub-section post-function-section">
            <i
              onClick={() => likeFollowingPost()}
              className={liked ? 'fa fa-heart-o liked' : 'fa fa-heart-o'}
            />
            <div>{moment(createdAt).fromNow()}</div>
          </div>
          <div className="sub-section like-comment-section">
            {this.renderLikes()}
            <div className="comment-section">{this.renderComments()}</div>
          </div>
          <div className="sub-section comment-input-section">
            <input
              value={this.state.content}
              onChange={this.handleOnChange.bind(this)}
              placeholder="Add a comment..."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewsfeedPost;
