import React, { Component } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';

class AvatarAndInfoModal extends Component {
  render() {
    const { showModal, closeModal } = this.props;

    return (
      <Modal
        dialogClassName="modal-update-avatar-container"
        show={showModal}
        onHide={() => closeModal()}
      >
        <ModalBody>
          {this.props.children}
          <div className="section" onClick={() => closeModal()}>
            Cancel
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default AvatarAndInfoModal;
