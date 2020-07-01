/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Alert from 'react-bootstrap/Alert';
import logo from '../../images/send.png';
import {
  fetchListHistoryNews,
  fetchListHistoryUserById,
  sendNews,
  sendNewsById,
} from '../../action/LocalAction';
import user from '../../images/user.png';
import user_new from '../../images/user1.png';
import bot from '../../images/bot.png';

export default function SendMessageToUser(props) {
  const divStyle = {
    margin: '40px',
    border: '5px solid pink',
  };
  const { state } = props.location;
  console.log({ state });

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const [text, setText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [variant, setVariant] = useState('success');
  const [textAlert, setTextAlert] = useState('');

  useEffect(() => {
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    setVisible(true);
    fetchListHistoryUserById(
      { id: state.employee._id, token: UserProfile.token },
      result => {
        console.log({ result });
        setVisible(false);
        if (result && result.data) {
          setData(result.data);
        } else {
          setVariant('danger');
          setShowAlert(true);
          setTextAlert('Không thể lấy được dữ liệu!');
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }
      },
    );
  }, []);

  const handleOnPressSubmit = () => {
    if (text === '') {
      setShowAlert(true);
      setVariant('danger');
      setTextAlert('Vui lòng điền tin nhắn!');
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      setVisibleButton(true);
      const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
      sendNewsById(
        {
          message: text,
          token: UserProfile.token,
          id: state.employee._id,
        },
        resultSend => {
          console.log({ resultSend });
          setVisibleButton(false);
          if (
            resultSend &&
            resultSend.message === 'Send message successfully!'
          ) {
            setText('');
            setShowAlert(true);
            setVariant('success');
            setTextAlert('Đã gửi tin nhắn thành công!');
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
            setVisible(true);
            fetchListHistoryUserById(
              { id: state.employee._id, token: UserProfile.token },
              result => {
                console.log({ result });
                setVisible(false);
                if (result && result.data) {
                  setData(result.data);
                } else {
                  setShowAlert(true);
                  setVariant('danger');
                  setTextAlert('Không thể lấy được dữ liệu!');
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 2000);
                }
              },
            );
          } else {
          }
        },
      );
    }
  };

  const onchangeText = evt => {
    setText(evt.target.value);
  };

  return (
    <div
      style={{
        marginTop: '40px',
        border: '5px solid',
      }}
    >
      <div>
        <img
          style={{ height: '20px', width: '20px' }}
          src={user}
          alt="tdtLogo"
        />{' '}
        {state.employee.first_name} {state.employee.last_name}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader
          visible={visible}
          type="ThreeDots"
          color="#2BAD60"
          height="50"
          width="50"
        />
      </div>
      <div style={{ height: '200px', overflowY: 'scroll' }}>
        {data.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottom: '2px solid',
            }}
          >
            {item.action !== 'response' ? (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img
                  style={{ height: '20px', width: '20px' }}
                  src={user_new}
                  alt="tdtLogo"
                />
                <p style={styles.pStyle}>
                  {item.telegram_user} : {item.text}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img
                  style={{ height: '20px', width: '20px' }}
                  src={bot}
                  alt="tdtLogo"
                />
                <p style={styles.pStyle}>Bot Telegram : {item.text}</p>
              </div>
            )}
            <p style={styles.pStyle}>{item.datetime}</p>
          </div>
        ))}
      </div>
      <form style={{ marginTop: '20px' }}>
        <label
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          Nhập tin nhắn :
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <input
              style={{ marginLeft: '5px', width: '300px', paddingLeft: '10px' }}
              type="text"
              name="name"
              value={text}
              onChange={onchangeText}
            />
            {visibleButton === false ? (
              <img
                style={{ height: '30px', width: '30px' }}
                src={logo}
                alt="Logo"
                onClick={handleOnPressSubmit}
              />
            ) : (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={30}
                width={30}
                visible={visibleButton}
              />
            )}
          </div>
        </label>
      </form>
      <Alert variant={`${variant}`} show={showAlert}>
        {textAlert}
      </Alert>
    </div>
  );
}

const styles = {
  pStyle: {
    fontSize: '15px',
    textAlign: 'flex',
    marginTop: '5px',
  },
};
