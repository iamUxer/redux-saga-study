export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILED = 'GET_ALL_USERS_FAILED';

export const CREATE_USERS = 'CREATE_USERS';
export const CREATE_USERS_SUCCESS = 'CREATE_USERS_SUCCESS';
export const CREATE_USERS_FAILED = 'CREATE_USERS_FAILED';

export const PATCH_USERS = 'PATCH_USERS';
export const PATCH_USERS_SUCCESS = 'PATCH_USERS_SUCCESS';
export const PATCH_USERS_FAILED = 'PATCH_USERS_FAILED';

export const DELETE_USERS = 'DELETE_USERS';
export const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
export const DELETE_USERS_FAILED = 'DELETE_USERS_FAILED';

export const UPDATE_INTRODUCE = 'UPDATE_INTRODUCE';
export const UPDATE_AGE = 'UPDATE_AGE';
// 1) 유저가 액션함수를 호출
export const getAllUsers = (user) => ({ type: GET_ALL_USERS }); // 액션함수
export const createUsers = (user) => ({
  type: CREATE_USERS,
  newuser: {
    name: user.name,
    email: user.email,
    introduce: user.introduce,
  },
});
export const patchUsers = (user) => ({
  type: PATCH_USERS,
  newdata: {
    ...user,
  },
});
export const deleteUsers = (user) => ({
  type: DELETE_USERS,
  id: user.id,
});

const initialState = {
  users: [],
  email: '',
  introduce: '안녕하세요',
};

// 2) 리듀서가 실행되어 스토어의 상태값을 변화
const user = (state = initialState, action) => {
  // action 함수가 실행되었을때 진행되는 작업을 분기
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.users };
    case CREATE_USERS:
      return { ...state };
    case CREATE_USERS_SUCCESS:
      return { ...state, users: action.users };
    case PATCH_USERS:
      return { ...state };
    case PATCH_USERS_SUCCESS:
      return { ...state, users: action.users };
    case DELETE_USERS:
      return { ...state };
    case DELETE_USERS_SUCCESS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};

export default user;
