// SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  // {...input} is equivalent to onBlur={input.onBlur} onChange={input.onChange}....
  // console.log(meta);
  // if touched is flase, it will stop excuting the boolean function
  // otherwise, if error is string, it will display the string
  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
