import React, { Component } from 'react';
import moment from 'moment';

class NewsfeedPost extends Component {
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
          <span>, {likes[1].fullName}</span>{' '}
          and <span>{likes[2].fullName}</span>
        </div>
      );
    } else if (likes.length > 0) {
      return (
        <div className="like-section">
          Liked by <span>{`${likes[0].fullName}`}</span>{likes[1] ? ' and ' : ''}
          {likes[1] ? <span>{likes[1].fullName}</span> : <div />}
        </div>
      );
    }
    return <div />;
  }

  render() {
    const { userAvatar, userName, imageLink, createdAt } = this.props;
    return (
      <div className="newsfeed-post-container">
        <div className="user-info-section">
          <img alt={userName} src={userAvatar} />
          <div>{userName}</div>
        </div>
        <img className="main-image" alt={userName} src={imageLink} />
        <div className="body-section">
          <div className="sub-section post-function-section">
            <i className="fa fa-heart-o" />
            <div>{moment(createdAt).fromNow()}</div>
          </div>
          <div className="sub-section like-comment-section">
            {this.renderLikes()}
            <div className="comment-section" />
          </div>
          <div className="sub-section comment-input-section">
            <input placeholder="Add a comment..." />
          </div>
        </div>
      </div>
    );
  }
}

export default NewsfeedPost;
