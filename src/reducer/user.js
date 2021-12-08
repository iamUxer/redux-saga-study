const UPDATE_INTRODUCE = "UPDATE_INTRODUCE";

// 1) 사용자가 액션을 요청한다.
//액션함수
export const updateIntroduce = (introduce) => ({
  type: UPDATE_INTRODUCE,
  introduce: introduce,
});

const initialState = {
  introduce: "안녕하세요",
};

// 2) 리듀서가 실행되어 스토어의 상태값을 변화
const user = (state = initialState, action) => {
  //action 함수가 실행되었을때 진행되는 작업을 분기
  switch (action.type) {
    case UPDATE_INTRODUCE:
      return {
        // redux의 불변성
        ...state,
        introduce: action.introduce,
      };
    default:
      return state;
  }
};

export default user;
