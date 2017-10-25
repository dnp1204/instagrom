import React, { Component } from 'react';

class DropDown extends Component {
  state = { showList: false };

  // componentDidUpdate(prevProps, prevState) {
  //   document.addEventListener('click', event => {
  //     if (
  //       !event.target.className.includes('dropdown-button') &&
  //       this.state.showList
  //     ) {
  //       this.setState({ showList: false });
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', event => {
  //     if (
  //       !event.target.className.includes('dropdown-button') &&
  //       this.state.showList
  //     ) {
  //       this.setState({ showList: false });
  //     }
  //   });
  // }

  renderDropDownList() {
    return <div className="dropdown-body">{this.props.children}</div>;
  }

  render() {
    return (
      <div className="dropdown-container">
        <div
          onClick={() => this.setState({ showList: !this.state.showList })}
          className="dropdown-button user-info"
        >
          <i className="fa fa-user-o fa-2x" />
        </div>
        {this.state.showList ? this.renderDropDownList() : <div />}
      </div>
    );
  }
}

export default DropDown;
