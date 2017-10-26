import React, { Component } from 'react';

class AutoSuggestion extends Component {
  renderSuggestion() {
    const { suggestionValue } = this.props;

    return suggestionValue.map(value => {
      return (
        <li key={value._id} className="tag">
          <div className="user-avatar">
            <img alt={value.name} src={value.avatar} />
          </div>
          <div className="user-info">
            <h4>{value.name}</h4>
            <p>{value.email}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    const { suggestionValue } = this.props;
    console.log(suggestionValue);
    return (
      <div className="suggestion-container">
        <div className="arrow-up" />
        <div className="suggestion-body">
          <ul>
            {suggestionValue.length > 0 ? this.renderSuggestion() : <div />}
          </ul>
        </div>
      </div>
    );
  }
}

export default AutoSuggestion;
