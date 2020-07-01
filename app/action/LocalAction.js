import {
  API_URL,
  DASH_BOARD,
  GET_LIST_HISTORY_NEW,
  GET_LIST_HISTORY_USER_BY_ID,
  GET_LIST_USER,
  LOGIN_API,
  SEND_NEWS,
  SEND_NEWS_BY_ID,
} from './ApiInfor';
import { LOGIN_ACTION, LOGOUT_ACTION } from './ActionTypes';

const receiveLogin = userprofile => ({
  type: LOGIN_ACTION,
  userprofile,
});
const receiveRegister = userprofile => ({
  type: LOGIN_ACTION,
  userprofile,
});

export const receivedDeviceInfo = deviceInfo => dispatch => {
  dispatch({ type: 'ABC', deviceInfo });
};

const receiveLogout = () => ({
  type: LOGOUT_ACTION,
});
export const logout = ({}, callback) => dispatch => {
  dispatch(receiveLogout());
};

export const fetchLogout = ({ token, push_token }, callback) => dispatch => {
  fetch(`${API_URL}${LOG_OUT}`, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify({ push_token }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(response => response.json()) // if success
    .then(responseJson => {
      callback(responseJson);
      if (responseJson.success === true) {
        dispatch(receiveLogout());
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};

export const fetchLogin = ({ email, password }, callback) => {
  fetch(`${API_URL}${LOGIN_API}`, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify({ email, password }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json()) // if success
    .then(responseJson => {
      console.log({ responseJson });
      callback(responseJson);
      if (responseJson.success === true) {
        // dispatch(receiveLogin(responseJson));
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};

export const fetchListUser = ({ token }, callback) => {
  fetch(`${API_URL}${GET_LIST_USER}?secret_token=${token}`, {
    method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
    // body: JSON.stringify({}),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(response => response.json()) // if success
    .then(responseJson => {
      console.log({ responseJson });
      callback(responseJson);
      if (responseJson.success === true) {
        // dispatch(receiveLogin(responseJson));
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};

export const fetchListHistoryNews = ({ token }, callback) => {
  fetch(`${API_URL}${GET_LIST_HISTORY_NEW}?secret_token=${token}`, {
    method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
    // body: JSON.stringify({}),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(response => response.json()) // if success
    .then(responseJson => {
      console.log({ responseJson });
      callback(responseJson);
      if (responseJson.success === true) {
        // dispatch(receiveLogin(responseJson));
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};

export const sendNews = ({ token, message }, callback) => {
  console.log({ message });
  fetch(`${API_URL}${SEND_NEWS}?secret_token=${token}&message=${message}`, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    // body: JSON.stringify({message}),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(response => response.json()) // if success
    .then(responseJson => {
      console.log({ responseJson });
      callback(responseJson);
      if (responseJson.success === true) {
        // dispatch(receiveLogin(responseJson));
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};

export const fetchDashBoard = ({ token }, callback) => {
  fetch(`${API_URL}${DASH_BOARD}?secret_token=${token}`, {
    method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
    // body: JSON.stringify({message}),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(response => response.json()) // if success
    .then(responseJson => {
      console.log({ responseJson });
      callback(responseJson);
      if (responseJson.success === true) {
        // dispatch(receiveLogin(responseJson));
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};

export const fetchListHistoryUserById = ({ token, id }, callback) => {
  console.log('dasdasdasdasdasdasdas')
  fetch(
    `${API_URL}${GET_LIST_HISTORY_USER_BY_ID}?secret_token=${token}&id=${id}`,
    {
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      // body: JSON.stringify({id}),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    },
  )
    .then(response => response.json()) // if success
    .then(responseJson => {
      console.log({ responseJson });
      callback(responseJson);
      if (responseJson.success === true) {
        // dispatch(receiveLogin(responseJson));
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};

export const sendNewsById = ({ token, message, id }, callback) => {
  console.log({ message });
  fetch(
    `${API_URL}${SEND_NEWS_BY_ID}?secret_token=${token}&message=${message}&id=${id}`,
    {
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      // body: JSON.stringify({message, id}),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    },
  )
    .then(response => response.json()) // if success
    .then(responseJson => {
      console.log({ responseJson });
      callback(responseJson);
      if (responseJson.success === true) {
        // dispatch(receiveLogin(responseJson));
      }
    }) // result
    .catch(function(error) {
      // catch to handle error
      // sendError(error, 2);
      callback(null);
      console.log(error.toString());
    });
};
