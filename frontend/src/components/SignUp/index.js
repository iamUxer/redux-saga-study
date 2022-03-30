import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, SIGNUP_USER_SUCCESS } from '../../reducer/user';
import styled from 'styled-components';

const SignUp = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => {
    // useSelector => redux 스토어의 상태를 조회한다.
    return state.user; //root reducer에서 명시한 이름
  });

  console.log('state.user', isSigningUp);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const { name, email, password, passwordCheck } = user;

  const [validate, setValidate] = useState({
    password: false,
  });

  useEffect(() => {
    if (user.password !== '' && user.passwordCheck !== '') {
      if (user.password !== user.passwordCheck) {
        setValidate((validate) => {
          // 함수형으로 써야 useEffect array 경고가 없다.
          return {
            ...validate,
            password: false,
          };
        });
      } else {
        setValidate((validate) => {
          return {
            ...validate,
            password: true,
          };
        });
      }
    } else {
      setValidate((validate) => {
        return {
          ...validate,
          password: false,
        };
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    // 서버 통신
    if (validate.password) {
      dispatch(signupUser(user));
      setUser({
        ...user,
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
      });
    }
  };
  return (
    <SignUpWrapper>
      <div>
        <div>
          <h2 className={!isSigningUp && 'unvisible'}>회원가입 성공!</h2>
        </div>
        <div>
          <label>이름</label>
          <input name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <label>이메일</label>
          <input name="email" value={email} onChange={handleChange} />
        </div>
        <div>
          <label>비밀번호</label>
          <input name="password" value={password} onChange={handleChange} />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            name="passwordCheck"
            value={passwordCheck}
            onChange={handleChange}
          />
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
