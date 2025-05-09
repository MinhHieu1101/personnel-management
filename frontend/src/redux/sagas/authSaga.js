import { call, put, takeLatest } from "redux-saga/effects";
import { GraphQLClient, gql } from "graphql-request";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  LOGOUT,
  TOKEN_RENEW,
} from "../actions/authActions";

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
  credentials: "include",
});

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      code
      success
      message
      errors
      accessToken
      refreshToken
      user {
        userId
        username
        email
        role
        createdAt
      }
    }
  }
`;

const RENEW_MUTATION = gql`
  mutation RenewToken($userId: String!) {
    renewToken(userId: $userId) {
      code
      success
      message
      errors
      accessToken
    }
  }
`;

function* loginSaga(action) {
  try {
    const result = yield call(
      [client, client.request],
      LOGIN_MUTATION,
      action.payload
    );
    const { code, success, message, errors, accessToken, refreshToken, user } =
      result.login;

    if (success) {
      sessionStorage.setItem("accessToken", accessToken);
      localStorage.setItem("currentUser", JSON.stringify(user));
    }

    yield put(
      loginSuccess({
        code,
        success,
        message,
        errors,
        accessToken,
        refreshToken,
        user,
      })
    );
  } catch (err) {
    yield put(loginFailure(err.response?.errors?.[0]?.message || err.message));
  }
}

function* clearLocalStorage() {
  yield call([localStorage, "clear"]);
}

function* renewTokenSaga(action) {
  try {
    const result = yield call(
      [client, client.request],
      RENEW_MUTATION,
      action.payload
    );
    const { code, success, message, errors, accessToken } = result.login;
  } catch (error) {}
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(TOKEN_RENEW, renewTokenSaga);
  yield takeLatest(LOGOUT, clearLocalStorage);
}
