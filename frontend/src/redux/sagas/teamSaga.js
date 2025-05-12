import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../api/axiosInstance";
import {
  FETCH_TEAM_REQUEST,
  fetchTeamRequest,
  fetchTeamSuccess,
  fetchTeamFailure,
  ADD_TEAM_REQUEST,
  addTeamSuccess,
  addTeamFailure,
  DELETE_TEAM_REQUEST,
  deleteTeamSuccess,
  deleteTeamFailure,
  ADD_MEMBER_REQUEST,
  addMemberSuccess,
  addMemberFailure,
  DELETE_MEMBER_REQUEST,
  deleteMemberSuccess,
  deleteMemberFailure,
  ADD_MANAGER_REQUEST,
  addManagerSuccess,
  addManagerFailure,
  DELETE_MANAGER_REQUEST,
  deleteManagerSuccess,
  deleteManagerFailure,
} from "../actions/teamActions";
import { fetchTeamsRequest } from "../actions/userActions";
import { toast } from "react-toastify";

const persistedUser = JSON.parse(localStorage.getItem("currentUser"));

function* fetchTeamSaga(action) {
  try {
    const response = yield call(axiosInstance.get, `/${action.payload}`);
    yield put(fetchTeamSuccess(response.data));
  } catch (err) {
    yield put(fetchTeamFailure(err.response?.data?.message || err.message));
  }
}

function* addTeamSaga(action) {
  try {
    const { teamName, members, managers } = action.payload;
    const response = yield call(axiosInstance.post, "/", {
      teamName,
      members,
      managers,
    });
    if (response.status === 201) {
      yield put(addTeamSuccess(response.data));
      toast.success(`Team "${response.data.teamName}" created!`, {
        autoClose: 3000,
      });
      yield put(fetchTeamsRequest(persistedUser.userId));
    }
  } catch (err) {
    yield put(addTeamFailure(err.response?.data?.message || err.message));
  }
}

function* deleteTeamSaga(action) {
  try {
    const { teamId } = action.payload;
    yield call(axiosInstance.delete, `/${teamId}`);
    yield put(deleteTeamSuccess({ teamId }));
    yield put(fetchTeamsRequest(persistedUser.userId));
  } catch (err) {
    yield put(deleteTeamFailure(err.response?.data?.message || err.message));
  }
}

function* addMemberSaga(action) {
  try {
    const { teamId, member } = action.payload;
    const response = yield call(
      axiosInstance.post,
      `/${teamId}/members`,
      member
    );
    yield put(addMemberSuccess(response.data));
  } catch (err) {
    yield put(addMemberFailure(err.response?.data?.message || err.message));
  }
}

function* deleteMemberSaga(action) {
  try {
    const { teamId, memberId } = action.payload;
    yield call(axiosInstance.delete, `/${teamId}/members/${memberId}`);
    yield put(deleteMemberSuccess({ memberId }));
    yield put(fetchTeamRequest(teamId));
  } catch (err) {
    yield put(deleteMemberFailure(err.response?.data?.message || err.message));
  }
}

function* addManagerSaga(action) {
  try {
    const { teamId, manager } = action.payload;
    const response = yield call(
      axiosInstance.post,
      `/${teamId}/managers`,
      manager
    );
    yield put(addManagerSuccess(response.data));
  } catch (err) {
    yield put(addManagerFailure(err.response?.data?.message || err.message));
  }
}

function* deleteManagerSaga(action) {
  const { teamId, managerId } = action.payload;
  try {
    yield call(axiosInstance.delete, `/${teamId}/managers/${managerId}`);
    yield put(deleteManagerSuccess({ managerId }));
    yield put(fetchTeamRequest(teamId));
  } catch (err) {
    yield put(deleteManagerFailure(err.response?.data?.message || err.message));
  }
}

export default function* teamSaga() {
  yield takeLatest(FETCH_TEAM_REQUEST, fetchTeamSaga);
  yield takeLatest(ADD_TEAM_REQUEST, addTeamSaga);
  yield takeLatest(DELETE_TEAM_REQUEST, deleteTeamSaga);
  yield takeLatest(ADD_MEMBER_REQUEST, addMemberSaga);
  yield takeLatest(DELETE_MEMBER_REQUEST, deleteMemberSaga);
  yield takeLatest(ADD_MANAGER_REQUEST, addManagerSaga);
  yield takeLatest(DELETE_MANAGER_REQUEST, deleteManagerSaga);
}
