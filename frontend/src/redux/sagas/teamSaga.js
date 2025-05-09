import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../api/axiosInstance";
import {
  FETCH_TEAM_REQUEST,
  fetchTeamSuccess,
  fetchTeamFailure,
} from "../actions/teamActions";

function* fetchTeamSaga(action) {
  try {
    const response = yield call(axiosInstance.get, `/${action.payload}`);
    yield put(fetchTeamSuccess(response.data));
  } catch (err) {
    yield put(fetchTeamFailure(err.response?.data?.message || err.message));
  }
}

export default function* teamSaga() {
  yield takeLatest(FETCH_TEAM_REQUEST, fetchTeamSaga);
}
