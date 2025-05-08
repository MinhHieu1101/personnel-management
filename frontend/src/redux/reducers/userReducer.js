import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "../actions/userActions";

const initialState = {
  users: [],
  user: null,
  teams: [],
  loading: false,
  teamsLoading: false,
  code: null,
  success: false,
  message: null,
  errors: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case FETCH_USER_REQUEST:
      return { ...state, loading: true };

    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case FETCH_USER_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case FETCH_TEAMS_REQUEST:
      return { ...state, teamsLoading: true };

    case FETCH_TEAMS_SUCCESS:
      return { ...state, teamsLoading: false, teams: action.payload };

    case FETCH_TEAMS_FAILURE:
      return { ...state, teamsLoading: false, message: action.payload };

    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_USER_SUCCESS: {
      const { code, message, user } = action.payload;
      return {
        ...state,
        user: user,
        loading: false,
        success: true,
        code,
        message,
      };
    }

    case ADD_USER_FAILURE:
      const { code, message, errors } = action.payload;
      return {
        ...state,
        loading: false,
        success: false,
        code,
        message,
        errors,
      };

    default:
      return state;
  }
};

export default userReducer;
