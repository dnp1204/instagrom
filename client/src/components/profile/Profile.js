import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPosts,
  followUser,
  followUserFromList,
  deleteAvatar,
  updateAvatar
} from '../../actions';
import PostList from './PostList';
import NumbersMobile from './NumbersMobile';
import ImageModalDetail from './ImageModalDetail';
import UserList from './UserList';
import UserInfo from './UserInfo';

class Profile extends Component {
  state = {
    showModalDetail: false,
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
  }

  closeModalDetail() {
    this.setState({ showModalDetail: false });
  }

  closeListModal() {
    this.setState({ showListModal: false });
  }

  openListModal(userList, titleModal) {
    this.setState({ showListModal: true, userList, titleModal });
  }

  handleFollowUser() {
    const { id } = this.props.match.params;
    this.props.followUser(id);
    this.setState({ following: !this.state.following });
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
              <UserInfo
                currentUserId={this.props.user._id}
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
                deleteAvatar={id => this.props.deleteAvatar(id)}
                updateAvatar={(id, url) => this.props.updateAvatar(id, url)}
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
              <ImageModalDetail
                showModalDetail={this.state.showModalDetail}
                closeModalDetail={this.closeModalDetail.bind(this)}
                avatar={avatar}
                name={name}
                id={id}
              />
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
  followUserFromList,
  deleteAvatar,
  updateAvatar
})(Profile);
