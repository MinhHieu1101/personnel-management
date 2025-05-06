import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import teamSaga from "./teamSaga";

export default function* rootSaga() {
  yield all([authSaga(), teamSaga()]);
}
