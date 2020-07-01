/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './appStyle.css';
import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import GlobalStyle from '../../global-styles';
import Sidebar from 'react-sidebar';
import Login from '../Login/Loadable';
import DashBoard from '../DashBoard/Loadable';
import managerEmployee from '../managerEmployee/Loadable';
import ManagerMessage from '../ManagerMessage/Loadable';
import exportExcel from '../ExportExcet/Loadable';
import SendMessageToUser from '../sendMessageToUser/Loadable';
import history from '../../utils/history';
import { fetchLogin } from '../../action/LocalAction';
import tdtLogo from '../../images/bot.png';
import processing from '../../images/processing.png';
import send_news from '../../images/newMessage.png';
import managerUser from '../../images/managerUser.png';
import exportExcelImg from '../../images/exceldownload.png';
import logout from '../../images/logout.png';
import background from '../../images/background.jpg';

const mql = window.matchMedia(`(min-width: 1000px)`);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      isLogin: true,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    const my_object = JSON.parse(localStorage.getItem('UserProfile'));
    console.log({ my_object });
    if (my_object !== null) {
      history.push('/');
      this.setState({
        isLogin: false,
      });
    } else {
      history.replace({ pathname: '/login' });
      this.setState({
        isLogin: true,
      });
    }
    // this.setState({
    //   isLogin: false,
    // });
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  getNavLinkClass = path =>
    history.location.pathname === '/sendMessageToUser' ? 'active' : '';

  onPressLogout = () => {
    const r = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (r === true) {
      localStorage.removeItem('UserProfile');
      history.replace({ pathname: '/login' });
      this.setState({
        isLogin: true,
      });
    } else {
      history.goBack();
    }
  };

  renderSideBar = () => (
    <div>
      <label
        className="logo"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <img
          onClick={() => {
            history.push('/');
          }}
          style={{ height: '50px', width: '50px' }}
          src={tdtLogo}
          alt="tdtLogo"
        />
        <a
          onClick={() => {
            history.push('/');
          }}
          type="button"
          style={{
            width: '100%',
            // backgroundColor: '#F6F6F6',
            color: '#caae1b',
            fontSize: '24px',
            fontFamily: 'Cochin',
            // padding: '8px 15px',
            // boxSizing: 'content-box',
            // position: 'fixed',
            // display: 'block'
          }}
        >
          TDTCHATBOT
        </a>
      </label>
      <ul style={{ width: '100%' }}>
        <li className={this.getNavLinkClass('/')}>
          <NavLink
            activeClassName="active"
            exact
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              onClick={() => {
                history.push('/');
              }}
              style={{ height: '20px', width: '20px' }}
              src={processing}
              alt="tdtLogo"
            />
            Quản lý tác vụ
          </NavLink>
        </li>
        <li className={this.getNavLinkClass('/managerMessage')}>
          <NavLink
            activeClassName="active"
            exact
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            to="/managerMessage"
          >
            <img
              style={{ height: '20px', width: '20px', marginBottom: '10px' }}
              src={send_news}
              alt="tdtLogo"
            />
            Gửi tin nhắn mới
          </NavLink>
        </li>
        <li className={this.getNavLinkClass('/managerEmployee')}>
          <NavLink
            activeClassName="active"
            exact
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            isActive={(match, location) =>
              location.pathname === '/managerEmployee' ||
              location.pathname === '/sendMessageToUser'
            }
            to="/managerEmployee"
          >
            <img
              style={{ height: '20px', width: '20px' }}
              src={managerUser}
              alt="tdtLogo"
            />
            Quản lý người dùng
          </NavLink>
        </li>
        <li className={this.getNavLinkClass('/exportExcel')}>
          <NavLink
            activeClassName="active"
            exact
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            to="/exportExcel"
          >
            <img
              style={{ height: '20px', width: '20px' }}
              src={exportExcelImg}
              alt="tdtLogo"
            />
            Xuất excel tất cả tin
          </NavLink>
        </li>
        <li
          className={this.getNavLinkClass('/abc')}
          onClick={this.onPressLogout}
        >
          <NavLink
            activeClassName="active"
            exact
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            to="/abc"
          >
            <img
              style={{ height: '20px', width: '20px' }}
              src={logout}
              alt="tdtLogo"
            />
            Đăng Xuất
          </NavLink>
        </li>
      </ul>
    </div>
  );

  onPressLogin = (email, password) => {
    console.log({ email, password });
    const dataToSend = {
      email,
      password,
    };
    //
    fetchLogin(dataToSend, result => {
      console.log({ result });
      if (result.message) {
        localStorage.setItem('UserProfile', JSON.stringify(result));
        history.push({ pathname: '/' });
        this.setState({
          isLogin: false,
        });
      } else {
        alert('login thất bại!');
      }
    });
  };

  render() {
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    return (
      <div
        style={{
          margin: '-10',
          display: 'block',
        }}
      >
        {this.state.isLogin === true ? (
          <Switch>
            <Route path="/login">
              <Login onPressLogin={this.onPressLogin} />
            </Route>
          </Switch>
        ) : (
          <Sidebar
            sidebar={this.renderSideBar()}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            docked={this.state.sidebarDocked}
            styles={{ sidebar: { background: '#13553c' } }}
          >
            <div>
              {this.state.sidebarOpen === false ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    style={{ marginLeft: '0.2%' }}
                    onClick={() =>
                      this.setState({
                        sidebarDocked: !this.state.sidebarDocked,
                      })
                    }
                    className="success"
                    role="button"
                  >
                    <img
                      src={require('../../images/menu.png')}
                      alt="menu"
                      width="25px"
                      height="20px"
                    />
                  </button>
                  <p style={{ color: 'blue' }}>
                    {UserProfile.user.role.toUpperCase()}
                  </p>
                </div>
              ) : null}
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/managerMessage" component={ManagerMessage} />
                <Route path="/managerEmployee" component={managerEmployee} />
                <Route
                  path="/sendMessageToUser"
                  component={SendMessageToUser}
                />
                <Route path="/exportExcel" component={exportExcel} />
                <Route path="" component={NotFoundPage} />
              </Switch>
              <GlobalStyle />
            </div>
          </Sidebar>
        )}
      </div>
    );
  }
}
