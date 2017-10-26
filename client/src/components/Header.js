import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import {
  ModalBody,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalFooter
} from 'react-bootstrap';
import fileStack from 'filestack-js';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { showUpload: false, imageLink: '', imageName: '' };
    this.fsClient = fileStack.init('ARG1DdJEEQAWY9Jd25nffz');
  }

  renderTextAreaField(field) {
    return (
      <div className="form-group">
        <textarea
          className="form-control"
          rows="6"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  async openPicker() {
    const response = await this.fsClient.pick({
      fromSources: ['local_file_system', 'url'],
      transformations: {
        crop: {
          force: true,
          aspectRatio: 1
        },
        circle: true,
        rotate: true
      },
      accept: ['jpg', 'png', 'jpeg'],
      maxFiles: 1,
      minFiles: 1
    });
    const { filesUploaded } = response;
    this.setState({
      imageLink: filesUploaded[0].url,
      imageName: filesUploaded[0].filename
    });
  }

  onsubmit(values) {
    console.log(values);
    console.log(this.state.imageLink);
    this.setState({ showUpload: false, imageLink: '', imageName: '' });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="header-container">
        <div className="header-brand">
          <div className="camera-logo">
            <Link to="/">
              <i className="fa fa-camera-retro fa-2x" />
            </Link>
          </div>
          <Link className="logo" to="/">
            <h1 className="logo">Instagrom</h1>
          </Link>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Searching" />
        </div>
        <div className="header-summary">
          <div
            className="upload"
            onClick={() => this.setState({ showUpload: true })}
          >
            <a>
              <i className="fa fa-cloud-upload fa-2x" />
            </a>
          </div>
          <div className="notification">
            <i className="fa fa-heart-o fa-2x" />
          </div>
          <div className="user-info">
            <Link to="/profile">
              <i className="fa fa-user-o fa-2x" />
            </Link>
          </div>
        </div>

        <Modal show={this.state.showUpload}>
          <ModalHeader>
            <ModalTitle>New Post</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Field
              name="description"
              type="textarea"
              placeholder="Your description"
              component={this.renderTextAreaField}
            />
            {this.state.imageName ? (
              <p>Image name: {this.state.imageName}</p>
            ) : (
              <div />
            )}
            <button
              className="btn btn-transparent"
              onClick={this.openPicker.bind(this)}
            >
              Pick your image
            </button>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => this.setState({ showUpload: false })}
              className="btn btn-danger"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(this.onsubmit.bind(this))}
              className="btn btn-transparent"
            >
              Post
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'uploadForm'
})(Header);
