import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const renderUsers = (userList, title, currentUser, visitedUserId, followUser) => {
  return userList.map(user => {
    let following = false;
    if (visitedUserId) {
      if (currentUser.following.includes(user._id)) {
        following = true;
      }
    } else {
      if (title === 'Following') {
        following = true;
      } else {
        if (currentUser.following.includes(user._id)) {
          following = true;
        }
      }
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
            onClick={() => console.log('hello')}
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
    visitedUserId,
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
          {renderUsers(userList, title, currentUser, visitedUserId, followUser)}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserList;
