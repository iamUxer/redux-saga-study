import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILED,
  CREATE_USERS,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_FAILED,
  PATCH_USERS,
  PATCH_USERS_SUCCESS,
  PATCH_USERS_FAILED,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_FAILED,
} from '../reducer/user';

// login 요청을 보내는 api
// api 함수는 유일하게 제너레이터 함수가 아니다!
function getAllUserApi() {
  return axios.get('http://localhost:3010/users');
}
// login 요청에 대한 액션이 감지되었을때 상태값 처리를 위해 동작하는 사가 함수
function* getAllUsersRequest(action) {
  try {
    const userData = yield call(getAllUserApi, action);
    yield put({ type: GET_ALL_USERS_SUCCESS, users: userData.data });
  } catch (err) {
    yield put({ type: GET_ALL_USERS_FAILED, error: err.response.data });
  }
}

function createUserApi(user) {
  const { newuser } = user;
  return axios.post('http://localhost:3010/users', {
    ...newuser,
  });
}

function* createUserApiRequest(action) {
  try {
    const newUser = yield call(createUserApi, action);
    yield put({ type: CREATE_USERS_SUCCESS, users: newUser.data });
  } catch (err) {
    yield put({ type: CREATE_USERS_FAILED, error: err.response.data });
  }
}

function patchUserApi(user) {
  const { id, name, email, introduce } = user.newdata;
  return axios.patch(`http://localhost:3010/users/${id}`, {
    name,
    email,
    introduce,
  });
}

function* patchUserApiRequest(action) {
  try {
    const reloadUser = yield call(patchUserApi, action);
    yield put({ type: PATCH_USERS_SUCCESS, users: reloadUser.data });
  } catch (err) {
    yield put({ type: PATCH_USERS_FAILED, error: err.response.data });
  }
}

function deleteUserApi(users) {
  const { id } = users;
  return axios.delete(`http://localhost:3010/users/${id}`);
}

function* deleteUserApiRequest(action) {
  try {
    const reloadUser = yield call(deleteUserApi, action);
    yield put({ type: DELETE_USERS_SUCCESS, users: reloadUser.data });
  } catch (err) {
    yield put({ type: DELETE_USERS_FAILED, error: err.response.data });
  }
}

// 로그인 요청이 들어오는지를 감지하는 제너레이터 함수
// addEventListener 함수와 그 사용법이 비슷하다.
function* watchGetAllUsers() {
  yield takeLatest(GET_ALL_USERS, getAllUsersRequest);
}
function* watchCreateUsers() {
  yield takeLatest(CREATE_USERS, createUserApiRequest);
}
function* watchPatchUsers() {
  yield takeLatest(PATCH_USERS, patchUserApiRequest);
}
function* watchDeleteUsers() {
  yield takeLatest(DELETE_USERS, deleteUserApiRequest);
}

// userSaga 함수 등록
export default function* userSaga() {
  yield all([
    watchGetAllUsers(),
    watchCreateUsers(),
    watchPatchUsers(),
    watchDeleteUsers(),
  ]);
}
