import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
} from "../actions/teamActions";

const initialState = {
  users: [],
  loading: false,
  error: null,
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
