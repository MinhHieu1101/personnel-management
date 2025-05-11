import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TOKEN_RENEW_REQUEST,
  TOKEN_RENEW_SUCCESS,
  TOKEN_RENEW_FAILURE,
} from "../actions/authActions";

const persistedUser = JSON.parse(localStorage.getItem("currentUser"));
const currentAccess = sessionStorage.getItem("accessToken");

const initialState = {
  user: persistedUser || null,
  accessToken: currentAccess || null,
  refreshToken: null,
  loading: false,
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
      const { code, success, message, accessToken, refreshToken, user } =
        action.payload;
      return {
        ...state,
        loading: false,
        code,
        success,
        message,
        accessToken,
        refreshToken,
        user,
      };
    }

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    case TOKEN_RENEW_REQUEST:
      return { ...state, loading: true };

    case TOKEN_RENEW_SUCCESS:
      return { ...state, accessToken: action.payload };

    case TOKEN_RENEW_FAILURE:
      return {
        code,
        loading: false,
        success: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
