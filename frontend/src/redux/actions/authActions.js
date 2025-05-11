// action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const TOKEN_RENEW_REQUEST = "TOKEN_RENEW_REQUEST";
export const TOKEN_RENEW_SUCCESS = "TOKEN_RENEW_SUCCESS";
export const TOKEN_RENEW_FAILURE = "TOKEN_RENEW_FAILURE";

// action creators
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

// sensitive tokens should not be stored in the store
export const loginSuccess = ({
  code,
  success,
  message,
  errors,
  accessToken,
  refreshToken,
  user,
}) => ({
  type: LOGIN_SUCCESS,
  payload: {
    code,
    success,
    message,
    errors,
    accessToken,
    refreshToken,
    user,
  },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({ type: LOGOUT });

export const tokenRenewRequest = (userId) => ({
  type: TOKEN_RENEW_REQUEST,
  payload: { userId },
});

export const tokenRenewSuccess = (newToken) => ({
  type: TOKEN_RENEW_SUCCESS,
  payload: newToken,
});

export const tokenRenewFailure = () => ({
  type: TOKEN_RENEW_FAILURE,
});
