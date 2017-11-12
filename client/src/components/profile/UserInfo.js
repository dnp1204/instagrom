import React, { Component } from 'react';
import Media from 'react-media';
import { Modal, ModalBody } from 'react-bootstrap';
import PropTypes from 'prop-types';
import fileStack from 'filestack-js';
import Numbers from './Numbers';

const MAX_LENGTH_NAME = 15;

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { showModalChangeAvatar: false };
    this.fsClient = fileStack.init('ARG1DdJEEQAWY9Jd25nffz');
  }

  async openPicker() {
    try {
      const response = await this.fsClient.pick({
        fromSources: ['local_file_system', 'url', 'facebook', 'instagram'],
        transformations: {
          circle: true,
          crop: {
            force: true,
            aspectRatio: 1
          }
        },
        accept: ['image/*', 'jpeg', 'png', 'jpg'],
        maxFiles: 1,
        minFiles: 1
      });
      const { filesUploaded } = response;
      this.setState({
        imageLink: filesUploaded[0].url
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderLogout() {
    return (
      <a className="btn btn-danger" href="/api/logout">
        Log out
      </a>
    );
  }

  renderFollow() {
    const { following, handleFollowUser } = this.props;

    if (following) {
      return (
        <button
          onClick={() => handleFollowUser()}
          className="btn btn-transparent"
        >
          Following
        </button>
      );
    }

    return (
      <button onClick={() => handleFollowUser()} className="btn btn-primary">
        Follow
      </button>
    );
  }

  closeModal() {
    this.setState({ showModalChangeAvatar: false });
  }

  render() {
    const {
      currentUserId,
      avatar,
      name,
      firstName,
      id,
      posts,
      following,
      followers,
      openListModal,
      deleteAvatar
    } = this.props;

    return (
      <div className="user-container">
        <div className="user-avatar">
          <img src={avatar} alt="avatar" />
          {id ? (
            <div />
          ) : (
            <div
              className="change-container"
              onClick={() => this.setState({ showModalChangeAvatar: true })}
            >
              Change
            </div>
          )}
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
          <Numbers
            posts={posts}
            following={following}
            followers={followers}
            openListModal={(userList, titleModal) =>
              openListModal(userList, titleModal)}
          />
        </div>
        <Modal
          dialogClassName="modal-update-avatar-container"
          show={this.state.showModalChangeAvatar}
          onHide={this.closeModal.bind(this)}
        >
          <ModalBody>
            <div
              className="section"
              onClick={() => {
                this.openPicker();
                this.closeModal();
              }}
            >
              Change your avatar
            </div>
            <div
              className="section"
              onClick={() => {
                deleteAvatar(currentUserId);
                this.closeModal();
              }}
            >
              Delete your current avatar
            </div>
            <div className="section" onClick={this.closeModal.bind(this)}>
              Cancel
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

UserInfo.PropTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  firstName: PropTypes.string,
  id: PropTypes.string,
  posts: PropTypes.array,
  following: PropTypes.array,
  followers: PropTypes.array,
  isFollowing: PropTypes.bool,
  openListModal: PropTypes.func,
  handleFollowUser: PropTypes.func
};

export default UserInfo;
