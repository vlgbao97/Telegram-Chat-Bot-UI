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
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
  useEffect,
} from '@trendmicro/react-sidenav';
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
import history from '../../utils/history';

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
    // history.push({ pathname: '/' });
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

  getNavLinkClass = path => {
    console.log('history', history);
    console.log('path', path);
    return history.location.pathname === path ? 'active' : '';
  };

  renderSideBar = () => (
    <div>
      <label className="logo">
        {' '}
        <a
          onClick={() => {
            history.push('/');
          }}
        >
          TDTBOT
        </a>
      </label>
      <ul>
        <li className={this.getNavLinkClass('/')}>
          <NavLink exact to="/">
            Quản lý tác vụ
          </NavLink>
        </li>
        <li className={this.getNavLinkClass('/managerMessage')}>
          <NavLink exact to="/managerMessage">
            Quản lý tin nhắn
          </NavLink>
        </li>
        <li className={this.getNavLinkClass('/managerEmployee')}>
          <NavLink exact to="/managerEmployee">
            Quản lý nhân viên
          </NavLink>
        </li>
      </ul>
    </div>
  );

  onPressLogin = () => {
    history.push({ pathname: '/' });
    this.setState({
      isLogin: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.isLogin === true ? (
          <Login onPressLogin={this.onPressLogin} />
        ) : (
          <Sidebar
            sidebar={this.renderSideBar()}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            docked={this.state.sidebarDocked}
            styles={{ sidebar: { background: '#656666' } }}
          >
            <div>
              {this.state.sidebarOpen === false ? (
                <button
                  style={{ marginLeft: '2%' }}
                  onClick={() =>
                    this.setState({ sidebarDocked: !this.state.sidebarDocked })
                  }
                >
                  <img
                    src={require('../../images/menu.png')}
                    alt="menu"
                    width="20px"
                    height="20px"
                  />
                </button>
              ) : null}
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/managerMessage" component={ManagerMessage} />
                <Route path="/managerEmployee" component={managerEmployee} />
                <Route path="" component={<NotFoundPage />} />
              </Switch>
              <GlobalStyle />
            </div>
          </Sidebar>
        )}
      </div>
    );
  }
}
