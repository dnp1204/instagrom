import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likePost, selectPost } from '../../actions';

class Post extends Component {
  render() {
    const {
      likes,
      comments,
      imageURL,
      postId,
      createdAt,
      userId,
      visitedUserId,
      displayModalDetail
    } = this.props;
    let checked = false;
    for (let user of likes) {
      if (user._id.toString() === userId) {
        checked = true;
      }
    }

    return (
      <div
        onClick={event => {
          if (!event.target.className.includes('fa fa-heart')) {
            displayModalDetail();
            this.props.selectPost({
              likes,
              comments,
              imageURL,
              postId,
              createdAt,
              isLiked: checked
            });
          }
        }}
        className="post-container"
      >
        <img alt={imageURL} src={imageURL} />
        <div className="post-detail">
          <p>
            {likes.length}{' '}
            <i
              onClick={() => this.props.likePost(postId, visitedUserId)}
              className={`fa fa-heart ${checked ? 'liked' : ''}`}
            />
          </p>
          <p>
            {comments.length} <i className="fa fa-comment" />
          </p>
        </div>
      </div>
    );
  }
}

export default connect(null, { likePost, selectPost })(Post);
