import { all, call, takeLatest, fork } from 'redux-saga/effects';
import { GET_USER } from '../reducer/user';

function getUserRequest() {
  console.log('saga getUserFromAPI');
  //네트워크 가져오는 부분
}

function* getUserFromAPI() {
  yield call(getUserRequest);
}

function* watchGetUser() {
  yield takeLatest(GET_USER, getUserFromAPI);
}

export default function* userSaga() {
  yield all([fork(watchGetUser)]);
}
