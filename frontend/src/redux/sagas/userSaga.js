import { call, put, takeLatest } from "redux-saga/effects";
import { GraphQLClient, gql } from "graphql-request";
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  FETCH_USER_REQUEST,
  fetchUserSuccess,
  fetchUserFailure,
  FETCH_TEAMS_REQUEST,
  fetchTeamsSuccess,
  fetchTeamsFailure,
  ADD_USER_REQUEST,
  createUserSuccess,
  createUserFailure,
} from "../actions/userActions";

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
  credentials: "include",
});

const USERS_QUERY = gql`
  query Users($role: UserType!) {
    users(role: $role) {
      userId
      username
      email
      role
      createdAt
    }
  }
`;

const USER_QUERY = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      userId
      username
      email
      role
      createdAt
    }
  }
`;

const TEAMS_QUERY = gql`
  query Teams($userId: ID!) {
    teams(userId: $userId) {
      teamId
      teamName
      rosterCount
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $role: UserType!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      code
      success
      message
      errors
      user {
        userId
        username
        email
        role
      }
    }
  }
`;

function* fetchUsersSaga(action) {
  const { role } = action.payload;
  try {
    const data = yield call([client, client.request], USERS_QUERY, { role });
    yield put(fetchUsersSuccess(role, data.users));
  } catch (err) {
    const msg = err.response?.errors?.[0]?.message || err.message;
    yield put(fetchUsersFailure(msg));
  }
}

function* fetchUserSaga(action) {
  try {
    const data = yield call([client, client.request], USER_QUERY, {
      userId: action.payload,
    });
    yield put(fetchUserSuccess(data.user));
  } catch (err) {
    const msg = err.response?.errors?.[0]?.message || err.message;
    yield put(fetchUserFailure(msg));
  }
}

function* fetchTeamsSaga(action) {
  try {
    const data = yield call([client, client.request], TEAMS_QUERY, {
      userId: action.payload,
    });
    yield put(fetchTeamsSuccess(data.teams));
  } catch (err) {
    const msg = err.response?.errors?.[0]?.message || err.message;
    yield put(fetchTeamsFailure(msg));
  }
}

function* createUserSaga(action) {
  try {
    const variables = action.payload;
    const data = yield call(
      [client, client.request],
      CREATE_USER_MUTATION,
      variables
    );
    yield put(createUserSuccess(data.createUser));
  } catch (err) {
    const msg = err.response?.errors?.[0]?.message || err.message;
    yield put(createUserFailure(msg));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(FETCH_TEAMS_REQUEST, fetchTeamsSaga);
  yield takeLatest(ADD_USER_REQUEST, createUserSaga);
}
