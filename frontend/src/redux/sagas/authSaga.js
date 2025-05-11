import { call, put, takeLatest } from "redux-saga/effects";
import { GraphQLClient, gql } from "graphql-request";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  TOKEN_RENEW_REQUEST,
  tokenRenewSuccess,
  tokenRenewFailure,
  logout,
  LOGOUT,
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
  mutation RenewToken($userId: ID!) {
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
    const { accessToken } = result.renewToken;
    sessionStorage.setItem("accessToken", accessToken);
    yield put(tokenRenewSuccess(accessToken));
  } catch (err) {
    yield put(tokenRenewFailure());
    yield put(logout());
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(TOKEN_RENEW_REQUEST, renewTokenSaga);
  yield takeLatest(LOGOUT, clearLocalStorage);
}
