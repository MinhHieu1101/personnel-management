export const FETCH_TEAM_REQUEST = "FETCH_TEAM_REQUEST";
export const FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS";
export const FETCH_TEAM_FAILURE = "FETCH_TEAM_FAILURE";

export const ADD_TEAM_REQUEST = "ADD_TEAM_REQUEST";
export const ADD_TEAM_SUCCESS = "ADD_TEAM_SUCCESS";
export const ADD_TEAM_FAILURE = "ADD_TEAM_FAILURE";

export const ADD_MEMBER_REQUEST = "ADD_MEMBER_REQUEST";
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";
export const ADD_MEMBER_FAILURE = "ADD_MEMBER_FAILURE";

export const DELETE_MEMBER_REQUEST = "DELETE_MEMBER_REQUEST";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_FAILURE = "DELETE_MEMBER_FAILURE";

export const ADD_MANAGER_REQUEST = "ADD_MANAGER_REQUEST";
export const ADD_MANAGER_SUCCESS = "ADD_MANAGER_SUCCESS";
export const ADD_MANAGER_FAILURE = "ADD_MANAGER_FAILURE";

export const DELETE_MANAGER_REQUEST = "DELETE_MANAGER_REQUEST";
export const DELETE_MANAGER_SUCCESS = "DELETE_MANAGER_SUCCESS";
export const DELETE_MANAGER_FAILURE = "DELETE_MANAGER_FAILURE";

export const fetchTeamRequest = (team) => ({
  type: FETCH_TEAM_REQUEST,
  payload: team,
});

export const fetchTeamSuccess = (team) => ({
  type: FETCH_TEAM_SUCCESS,
  payload: team,
});

export const fetchTeamFailure = (error) => ({
  type: FETCH_TEAM_FAILURE,
  payload: error,
});

export const addTeamRequest = (team) => ({
  type: ADD_TEAM_REQUEST,
  payload: team,
});

export const addTeamSuccess = (team) => ({
  type: ADD_TEAM_SUCCESS,
  payload: team,
});

export const addTeamFailure = (error) => ({
  type: ADD_TEAM_FAILURE,
  payload: error,
});

export const addMemberRequest = (member) => ({
  type: ADD_MEMBER_REQUEST,
  payload: member,
});

export const addMemberSuccess = (member) => ({
  type: ADD_MEMBER_SUCCESS,
  payload: member,
});

export const addMemberFailure = (error) => ({
  type: ADD_MEMBER_FAILURE,
  payload: error,
});

export const deleteMemberRequest = (memberId) => ({
  type: DELETE_MEMBER_REQUEST,
  payload: memberId,
});

export const deleteMemberSuccess = (memberId) => ({
  type: DELETE_MEMBER_SUCCESS,
  payload: memberId,
});

export const deleteMemberFailure = (error) => ({
  type: DELETE_MEMBER_FAILURE,
  payload: error,
});

export const addManagerRequest = (manager) => ({
  type: ADD_MANAGER_REQUEST,
  payload: manager,
});

export const addManagerSuccess = (manager) => ({
  type: ADD_MANAGER_SUCCESS,
  payload: manager,
});

export const addManagerFailure = (error) => ({
  type: ADD_MANAGER_FAILURE,
  payload: error,
});

export const deleteManagerRequest = (managerId) => ({
  type: DELETE_MANAGER_REQUEST,
  payload: managerId,
});

export const deleteManagerSuccess = (managerId) => ({
  type: DELETE_MANAGER_SUCCESS,
  payload: managerId,
});

export const deleteManagerFailure = (error) => ({
  type: DELETE_MANAGER_FAILURE,
  payload: error,
});
