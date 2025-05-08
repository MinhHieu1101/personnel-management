import { call, put, takeLatest } from "redux-saga/effects";
import { GraphQLClient, gql } from "graphql-request";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
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
      auth {
        accessToken
        refreshToken
        userId
      }
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
    const response = result.login;
    yield put(loginSuccess(response));
  } catch (err) {
    yield put(loginFailure(err.response?.errors?.[0]?.message || err.message));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
