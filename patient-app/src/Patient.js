// src/Patient.js
import React, { Component } from 'react';

class Patient extends Component {
  render() {
    const { name, fasting, afterFood } = this.props;

    return (
      <div id='main'>
        <h1>{`${name} has ${fasting} sugar in fasting  and ${afterFood} after food`}</h1>
        <hr />
      </div>
    );
  }
}

export default Patient;
