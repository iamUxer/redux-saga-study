export const UPDATE_INTRODUCE = 'UPDATE_INTRODUCE';
export const GET_USER = 'GET_USER';

// 1) 사용자가 액션을 요청한다.
//액션함수
export const updateIntroduce = (introduce) => ({
  type: UPDATE_INTRODUCE,
  introduce: introduce, //store
});

export const getUser = (user) => ({
  type: GET_USER,
  user: user,
});

const initialState = {
  introduce: '안녕하세요',
  user: { name: '홍길동', email: 'aksjdf@jadkfjs.com' },
};

// 2) 리듀서가 실행되어 스토어의 상태값을 변경
const user = (state = initialState, action) => {
  //action 함수가 실행되었을때 진행되는 작업을 분기
  switch (action.type) {
    case UPDATE_INTRODUCE:
      return {
        ...state,
        introduce: action.introduce, //store의 상태값 변경
      };
    case GET_USER:
      //API 요청이 들어왔다.
      return {
        ...state,
        user: action.user, //store의 상태값 변경
      };
    default:
      return state;
  }
};

export default user;
