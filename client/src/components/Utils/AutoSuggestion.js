import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class AutoSuggestion extends Component {
  state = { show: false };

  componentDidMount() {
    document.addEventListener('click', this.handleClickEvent.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickEvent.bind(this));
  }

  handleClickEvent(event) {
    const { className } = event.target;

    if (className.includes('header-input')) {
      this.setState({ show: true });
    } else if (this.state.show) {
      this.setState({ show: false });
    }
  }

  renderSuggestion() {
    const { suggestionValue, resetValue } = this.props;

    return suggestionValue.map(value => {
      return (
        <li key={value._id} className="tag">
          <Link
            onClick={() => {
              this.setState({ show: false });
              resetValue();
            }}
            to={`/profile/${value._id}`}
            className="wrapper"
          >
            <div className="user-avatar">
              <img className="image" alt={value.name} src={value.avatar} />
            </div>
            <div className="user-info">
              <h4 className="name">{value.name}</h4>
              <p className="email">{value.email}</p>
            </div>
          </Link>
        </li>
      );
    });
  }

  handleOnFocus() {
    this.setState({ show: true });
  }

  handleOnBlur(event) {
    // this.setState({ show: false });
  }

  render() {
    const { suggestionValue, onChange, value } = this.props;
    let className = 'suggestion-container';
    if (
      suggestionValue.length <= 0 ||
      this.state.show === false ||
      value === ''
    ) {
      className += ' none';
    }

    return (
      <div className="header-search">
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Searching"
          onFocus={this.handleOnFocus.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          className="header-input"
        />
        <div className="fa fa-search" />
        <div className={className}>
          <div className="arrow-up" />
          <div className="suggestion-body">
            <ul>{this.renderSuggestion()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AutoSuggestion;
