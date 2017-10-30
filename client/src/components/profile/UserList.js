import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';

const renderUsers = (userList, title, currentUser, visitedUserId) => {
  return userList.map(user => {
    let following = false;
    if (title === 'Following') {
      following = true;
    } else {
      if (currentUser.following.includes(user._id)) {
        following = true;
      }
    }

    return (
      <div key={user._id} className="userlist-container">
        <div className="user-info">
          <img alt={user.avatar} src={user.avatar} />
          <div>{user.fullName}</div>
        </div>
        {currentUser._id === user._id ? (
          <div />
        ) : (
          <button
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
    visitedUserId
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
          {renderUsers(userList, title, currentUser, visitedUserId)}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserList;
