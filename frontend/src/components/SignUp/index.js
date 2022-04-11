import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../reducer/user';
import styled from 'styled-components';

const SignUp = () => {
  const dispatch = useDispatch();
  const { isSignupSuccess, isSignupFailed } = useSelector((state) => {
    // useSelector => redux 스토어의 상태를 조회한다.
    return state.user; //root reducer에서 명시한 이름
  });

  const [isFirst, setIsFirst] = useState(true);

  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
      // console.log(value);
      setValue(event.target.value);
    };
    const reset = () => {
      setValue(initialValue);
    };
    return { value, onChange, reset };
  };

  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const passwordCheck = useInput('');

  //state를 각각 따로 분리한다. useInput 사용해보기
  const [validate, setValidate] = useState({
    password: false,
  }); //얘도 isValidate 상태 따로 만들기

  // Password Vaildate
  useEffect(() => {
    // Fast Failed
    if (password.value !== '' || passwordCheck.value !== '') {
      setValidate((validate) => {
        return {
          ...validate,
          password: false,
        };
      });
    }

    if (password.value !== passwordCheck.value) {
      setValidate((validate) => {
        // 함수형으로 써야 useEffect array 경고가 없다.
        return {
          ...validate,
          password: false,
        };
      });
      return;
    }

    setValidate((validate) => {
      return {
        ...validate,
        password: true,
      };
    });
  }, [password.value, passwordCheck.value]);

  // setIsFirst
  useEffect(() => {
    if (isSignupFailed) {
      setIsFirst(true);
    }
    if (isSignupSuccess) {
      setIsFirst(false);
    }
  }, [isSignupSuccess, isSignupFailed]);

  const handleClick = () => {
    // 서버 통신
    if (validate.password) {
      dispatch(
        signupUser({
          name: name.value,
          email: email.value,
          password: password.value,
          passwordCheck: password.value,
        })
      );
    }
    name.reset();
    email.reset();
    password.reset();
    passwordCheck.reset();
  };

  return (
    <SignUpWrapper>
      <div>
        <div>
          {/* 1) 첫 로딩 2) 가입성공했을때 3) 실패했을때 */}
          {isFirst && <h2>회원가입 해주세요.</h2>}
          {!isSignupFailed && isSignupSuccess && <h2>회원가입 성공!</h2>}
          {isSignupFailed && <h2>회원가입 실패</h2>}
        </div>
        <div>
          <label>이름</label>
          <input name="name" {...name} />
        </div>
        <div>
          <label>이메일</label>
          <input name="email" {...email} />
        </div>
        <div>
          <label>비밀번호</label>
          <input name="password" {...password} />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input name="passwordCheck" {...passwordCheck} />
        </div>
        <button type={'submit'} onClick={handleClick}>
          Submit
        </button>
      </div>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  & div {
    font-size: 12px;
    & + div {
      margin-top: 10px;
    }
    & h2 {
      color: green;
      visibility: visible;
      &.unvisible {
        visibility: hidden;
        transition: all 0.5s;
      }
    }
  }
  & label {
    width: 80px;
    display: inline-block;
    text-align: right;
  }
  & input {
    height: 32px;
    border-radius: 0;
    box-sizing: border-box;
    border: 1px solid;
    margin-left: 10px;
  }
  & button {
    margin-top: 10px;
    float: right;
    height: 32px;
    border-radius: 0;
    box-sizing: border-box;
    border: 1px solid;
  }
`;

export default SignUp;
