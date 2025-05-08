import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  ADD_TEAM_REQUEST,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
  ADD_MANAGER_REQUEST,
  ADD_MANAGER_SUCCESS,
  ADD_MANAGER_FAILURE,
  DELETE_MANAGER_REQUEST,
  DELETE_MANAGER_SUCCESS,
  DELETE_MANAGER_FAILURE,
} from "../actions/teamActions";

const initialState = {
  users: [],
  loading: false,
  message: null,
  errors: [],
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAM_REQUEST:
      return { ...state, loading: true };

    case FETCH_TEAM_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case FETCH_TEAM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default teamReducer;
