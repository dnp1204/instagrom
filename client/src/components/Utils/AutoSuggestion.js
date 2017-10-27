import React, { Component } from 'react';

class AutoSuggestion extends Component {
  state = { show: false };

  renderSuggestion() {
    const { suggestionValue } = this.props;

    return suggestionValue.map(value => {
      return (
        <li key={value._id} className="tag">
          <div className="wrapper">
            <div className="user-avatar">
              <img alt={value.name} src={value.avatar} />
            </div>
            <div className="user-info">
              <h4>{value.name}</h4>
              <p>{value.email}</p>
            </div>
          </div>
        </li>
      );
    });
  }

  handleOnFocus() {
    this.setState({ show: true });
  }

  handleOnBlur() {
    this.setState({ show: false });
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
          onChange={onChange}
          type="text"
          placeholder="Searching"
          onFocus={this.handleOnFocus.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
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
