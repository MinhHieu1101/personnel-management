import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TOKEN_RENEW,
} from "../actions/authActions";

const initialState = {
  userId: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  message: null,
  code: null,
  success: false,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS: {
      const { code, success, message, errors, auth } = action.payload;
      return {
        ...state,
        loading: false,
        code,
        success,
        message,
        errors,
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        userId: auth.userId,
      };
    }

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case TOKEN_RENEW:
      return { ...state, accessToken: action.payload };

    default:
      return state;
  }
};

export default authReducer;
