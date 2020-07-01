/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect, useState} from 'react';
import {fetchDashBoard, fetchListHistoryNews} from '../../action/LocalAction';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Alert from 'react-bootstrap/Alert';
import Loader from 'react-loader-spinner';

export default function HomePage() {
  const divStyle = {
    margin: '40px',
    border: '5px solid pink',
  };

  const pStyle = {
    fontSize: '15px',
    textAlign: 'center',
  };

  const [visible, setVisible] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [variant, setVariant] = useState('success');
  const [textAlert, setTextAlert] = useState('');

  useEffect(() => {
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    setVisible(true);
    setVisibleButton(true);
    fetchDashBoard({token: UserProfile.token}, result => {
      console.log({result});
      setVisible(false);
      setVisibleButton(false);
      if (result && result.data) {
        setData(result.data)
      } else {
        setVariant('danger');
        setShowAlert(true);
        setTextAlert('Không thể lấy được dữ liệu!');
        setTimeout(() => {
          setShowAlert(false)
        }, 2000);
      }
    });
  }, []);

  return (
    <div
      style={{
        marginTop: '40px',
        border: '5px solid',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <div style={styles.containerMess}>
        <p style={styles.textTitle}>Số lượng tin nhắn</p>
        <div style={{ borderBottom: '2px solid white',
          width : '100%'}}>
        </div>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={30}
          width={30}
          visible={visibleButton}
        />
        <p
          style={{
            fontSize: '40px',
            color: 'white',
          }}
        >
          {data.message_count}
        </p>
      </div>
      <div style={styles.containerUser}>
        <p style={styles.textTitle}>Số lượng người dùng</p>
        <div style={{ borderBottom: '2px solid white',
          width : '100%'}}>
        </div>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={30}
          width={30}
          visible={visibleButton}
        />
        <p
          style={{
            fontSize: '40px',
            display: 'flex',
            color: 'white',
          }}
        >
          {data.user_count}
        </p>
      </div>
      <Alert variant={`${variant}`} show={showAlert}>
        {textAlert}
      </Alert>
    </div>
  );
}

const styles = {
  containerUser: {
    margin: '40px',
    borderRadius: '20px',
    backgroundColor: '#52a151',
    height: '200px',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerMess: {
    margin: '40px',
    borderRadius: '20px',
    backgroundColor: '#347bfb',
    height: '200px',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textTitle: {
    marginTop: '10px',
    color: 'white',
    alignItems: 'center',
    fontSize: '100%',
  },
};
