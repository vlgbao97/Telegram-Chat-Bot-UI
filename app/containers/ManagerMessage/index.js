/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export default function ManagerMessage() {
  const divStyle = {
    margin: '40px',
    border: '5px solid pink',
  };

  const pStyle = {
    fontSize: '15px',
    textAlign: 'center',
  };

  return (
    <div
      style={{
        margin: '40px',
        border: '5px solid pink',
      }}
    >
      <p style={pStyle}>This is message</p>
    </div>
  );
}
