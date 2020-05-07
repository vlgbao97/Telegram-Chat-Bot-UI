/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import './appStyle.css';

export default function Login(props) {
  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Sign In</h3>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <i className="fab fa-facebook-square" />
              </span>
              <span>
                <i className="fab fa-google-plus-square" />
              </span>
              <span>
                <i className="fab fa-twitter-square" />
              </span>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                />
              </div>
              <div className="row align-items-center remember">
                <input type="checkbox" value="Remember Me" />
                CheckMe
              </div>
              <div className="form-group" onClick={() => props.onPressLogin()}>
                <input
                  type="submit"
                  value="Login"
                  className="btn float-right login_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<a href="#">Sign Up</a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '40px',
    border: '5px solid pink',
    alignItems: 'center',
  },
  divStyle: {
    margin: '40px',
    border: '5px solid pink',
    alignSelf: 'center',
  },
  pStyle: {
    fontSize: '15px',
    textAlign: 'center',
  },
};
