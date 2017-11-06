import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  renderPostRow(index) {
    const { posts, user: { _id }, visitedUserId } = this.props;

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
            visitedUserId={visitedUserId}
            userId={_id}
            postId={post._id}
            likes={post.likes}
            comments={post.comments}
            imageURL={post.image}
            displayModalDetail={() => this.props.displayModalDetail()}
          />
        </div>
      );
    });
  }

  renderPosts() {
    const { posts } = this.props;

    return posts.map((post, index) => {
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

  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    );
  }
}

export default PostList;