import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const renderUsers = (userList, title, currentUser, followUser) => {
  return userList.map(user => {
    let following = false;
    if (currentUser.following.includes(user._id)) {
      following = true;
    }

    return (
      <div key={user._id} className="userlist-container">
        <Link to={`/profile/${user._id}`} className="user-info">
          <img alt={user.avatar} src={user.avatar} />
          <div>{user.fullName}</div>
        </Link>
        {currentUser._id === user._id ? (
          <div />
        ) : (
          <button
            onClick={() => followUser(user._id)}
            className={`btn ${following ? 'btn-transparent' : 'btn-primary'}`}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
    );
  });
};

const UserList = props => {
  const {
    showModal,
    closeModal,
    userList,
    title,
    currentUser,
    followUser
  } = props;

  return (
    <div>
      <Modal
        dialogClassName="userlist-modal-container"
        show={showModal}
        onHide={() => closeModal()}
      >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {renderUsers(userList, title, currentUser, followUser)}
        </ModalBody>
      </Modal>
    </div>
  );
};

UserList.propTypes = {
  title: PropTypes.string,
  currentUser: PropTypes.object,
  userList: PropTypes.array,
  followUser: PropTypes.func,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
}

export default UserList;
