import { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_BEGIN } from "./constants";

export const loginBegin = (user) => ({
  type: LOGIN_BEGIN,
  payload: user,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutBegin = () => ({
  type: LOGOUT_BEGIN,
})