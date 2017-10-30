import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';

const renderUsers = userList => {
  return userList.map(user => {
    return (
      <div key={user._id} className="userlist-container">
        <div className="user-info">
          <img alt={user.avatar} src={user.avatar} />
          <div>{user.fullName}</div>
        </div>
        <button className="btn btn-primary">Button</button>
      </div>
    );
  });
}

const UserList = (props) => {
  const { showModal, closeModal, userList, title } = props;

  return (
    <div>
      <Modal dialogClassName="userlist-modal-container" show={showModal} onHide={() => closeModal()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {renderUsers(userList)}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UserList;