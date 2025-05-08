export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const FETCH_TEAMS_REQUEST = "FETCH_TEAMS_REQUEST";
export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

export const fetchUsersRequest = (users) => ({
  type: FETCH_USERS_REQUEST,
  payload: users,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUserRequest = (user) => ({
  type: FETCH_USER_REQUEST,
  payload: user,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchTeamsRequest = (teams) => ({
  type: FETCH_TEAMS_REQUEST,
  payload: teams,
});

export const fetchTeamsSuccess = (teams) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: teams,
});

export const fetchTeamsFailure = (error) => ({
  type: FETCH_TEAMS_FAILURE,
  payload: error,
});

export const createUserRequest = (username, email, password, role) => ({
  type: ADD_USER_REQUEST,
  payload: { username, email, password, role },
});

export const createUserSuccess = (response) => ({
  type: ADD_USER_SUCCESS,
  payload: response,
});

export const createUserFailure = (error) => ({
  type: ADD_USER_FAILURE,
  payload: error,
});
