import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likePost } from '../../actions';

class Post extends Component {
  render() {
    const { likes, comments, imageURL, postId, userId } = this.props;
    let checked = false;
    for (let user of likes) {
      if (user._id.toString() === userId) {
        checked = true;
      }
    }

    return (
      <div className="post-container">
        <img alt={imageURL} src={imageURL} />
        <div className="post-detail">
          <p>
            {likes.length}{' '}
            <i
              onClick={() => this.props.likePost(postId)}
              className={`fa fa-heart-o ${checked ? 'liked' : ''}`}
            />
          </p>
          <p>
            {comments} <i className="fa fa-comment-o" />
          </p>
        </div>
      </div>
    );
  }
}

export default connect(null, { likePost })(Post);
