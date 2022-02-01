import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIntroduce, getUser } from '../../reducer/user';

const Admin = () => {
  //store에서 값을 가져오게.
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const { introduce } = useSelector((state) => {
    // useSelector => redux 스토어의 상태를 조회한다.
    return state.user; //reducer의 이름
  });
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    dispatch(updateIntroduce(value)); //value를 넘기고, 액션을 요청한다.
  };

  const dummyUser = { name: '럭키', email: 'aksjdf@jadkfjs.com' };

  const handleGetUser = () => {
    dispatch(getUser(dummyUser));
  };

  return (
    <div>
      <h1>Admin</h1>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>입력</button>
      <button onClick={handleGetUser}>유저정보 가져오기</button>
      <p>{introduce}</p>
    </div>
  );
};

export default Admin;
