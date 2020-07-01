/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Employee from '../../components/Employee';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import history from '../../utils/history';
import { fetchListUser } from '../../action/LocalAction';

export default function managerEmployee() {
  const divStyle = {
    margin: '40px',
    border: '5px solid pink',
  };
  const [employee, setEmployee] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    setVisible(true);
    fetchListUser({ token: UserProfile.token }, result => {
      console.log({ result });
      setVisible(false);
      if (result && result.data) {
        setEmployee(result.data);
      } else {
        alert('không thể lấy được dữ liệu');
      }
    });
  }, []);
  const pStyle = {
    fontSize: '15px',
    textAlign: 'center',
  };

  const handleOnPressEmployee = employee => {
    history.push({
      pathname: '/sendMessageToUser',
      state: { employee },
    });
  };

  const handleOnPressExcelDownload = employee => {
    console.log({ employee });
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    const r = window.confirm('Bạn có chắc chắn muốn tải file excel này về ?');
    if (r === true) {
      window.location.href = `https://telegram-chat-bot-news.herokuapp.com/system-routes/exportDownloadById?secret_token=${
        UserProfile.token
      }&id=${employee._id}`;
    } else {
    }
  };

  const listItems = employee.map(e => (
    <Employee
      first_name={e.first_name}
      last_name={e.last_name}
      id={e.uid}
      handleOnPressEmployee={() => handleOnPressEmployee(e)}
      handleOnPressExcelDownload={() => handleOnPressExcelDownload(e)}
    />
  ));
  return (
    <div
      style={{
        marginTop: '40px',
        border: '5px solid',
        height: '500px',
        overflowY: 'scroll',
      }}
    >
      <ul className="employee-list">{listItems}</ul>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader
          visible={visible}
          type="ThreeDots"
          color="#2BAD60"
          height="50"
          width="50"
        />
      </div>
    </div>
  );
}
