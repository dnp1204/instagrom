import React, { Component } from 'react';
import Media from 'react-media';
import { Modal, ModalBody } from 'react-bootstrap';
import Numbers from './Numbers';
import PropTypes from 'prop-types';

const MAX_LENGTH_NAME = 15;

const renderLogout = () => {
  return (
    <a className="btn btn-danger" href="/api/logout">
      Log out
    </a>
  );
};

const renderFollow = (following, handleFollowUser) => {
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
};

class UserInfo extends Component {
  state = { showModalChangeAvatar: false };

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
      avatar,
      name,
      firstName,
      id,
      posts,
      following,
      followers,
      openListModal,
      isFollowing,
      handleFollowUser
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
            <div className="section">Change your avatar</div>
            <div className="section">Delete your current avatar</div>
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
