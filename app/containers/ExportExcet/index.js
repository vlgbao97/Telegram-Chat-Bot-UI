/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import history from '../../utils/history';
import download from '../../images/download.png';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export default function ManagerMessage() {
  const divStyle = {
    margin: '40px',
    border: '5px solid pink',
  };

  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleDownload = () => {
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    const r = window.confirm('Bạn có chắc chắn muốn tải file excel này về ?');
    if (r === true) {
      window.location.href = `https://telegram-chat-bot-news.herokuapp.com/system-routes/exportDownload?secret_token=${
        UserProfile.token
      }`;
    } else {
    }
  };

  return (
    <div
      style={{
        marginTop: '40px',
        border: '5px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <a
        className="btn btn-success"
        role="button"
        style={{ color: 'white' }}
        download="proposed_file_name"
        onClick={handleDownload}
      >
        {' '}
        <img
          onClick={() => {
            history.push('/');
          }}
          style={{ height: '20px', width: '20px' }}
          src={download}
          alt="tdtLogo"
        />
        Tải file excel
      </a>
    </div>
  );
}

const styles = {
  pStyle: {
    fontSize: '15px',
    textAlign: 'center',
    marginBottom: '5px',
  },
};
