// action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const TOKEN_RENEW = "TOKEN_RENEW";

// action creators
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({ type: LOGOUT });

export const tokenRenew = (newToken) => ({
  type: TOKEN_RENEW,
  payload: newToken,
});
