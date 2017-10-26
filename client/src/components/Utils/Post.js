import React, { Component } from 'react';

class Post extends Component {
  
  render() {
    const { likes, comments, imageURL } = this.props;
  
    return (
      <div className="post-container">
        <img alt={imageURL} src={imageURL} />
        <div className="post-detail">
          <p>{likes} <i className="fa fa-heart-o"></i></p>
          <p>{comments} <i className="fa fa-comment-o"></i></p>
        </div>
      </div>
    );
  }
}

export default Post;