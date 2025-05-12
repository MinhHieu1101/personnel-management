import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  ADD_TEAM_REQUEST,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
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
  people: {
    teamId: null,
    teamName: null,
    teamLeader: null,
    managers: [],
    members: [],
  },
  team: null,
  loading: false,
  message: null,
  errors: [],
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAM_REQUEST:
      return { ...state, loading: true };

    case FETCH_TEAM_SUCCESS:
      return { ...state, loading: false, people: action.payload };

    case FETCH_TEAM_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case ADD_TEAM_REQUEST:
      return { ...state, loading: true };

    case ADD_TEAM_SUCCESS:
      return { ...state, loading: false, team: action.payload };

    case ADD_TEAM_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case DELETE_TEAM_REQUEST:
      return { ...state, loading: true };

    case DELETE_TEAM_SUCCESS:
      //const { teamId } = action.payload;
      return { ...state, loading: false };

    case DELETE_TEAM_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case ADD_MEMBER_REQUEST:
      return { ...state, loading: true };

    case ADD_MEMBER_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case ADD_MEMBER_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case DELETE_MEMBER_REQUEST:
      return { ...state, loading: true };

    case DELETE_MEMBER_SUCCESS:
      const { memberId } = action.payload;
      return {
        ...state,
        loading: false,
        people: {
          ...state.people,
          members: state.people.members.filter((m) => m.memberId !== memberId),
        },
      };

    case DELETE_MEMBER_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case ADD_MANAGER_REQUEST:
      return { ...state, loading: true };

    case ADD_MANAGER_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case ADD_MANAGER_FAILURE:
      return { ...state, loading: false, message: action.payload };

    case DELETE_MANAGER_REQUEST:
      return { ...state, loading: true };

    case DELETE_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        people: {
          ...state.people,
          managers: state.people.managers.filter(
            (mgr) => mgr.managerId !== action.payload.managerId
          ),
        },
      };

    case DELETE_MANAGER_FAILURE:
      return { ...state, loading: false, message: action.payload };

    default:
      return state;
  }
};

export default teamReducer;
