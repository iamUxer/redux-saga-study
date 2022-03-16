import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const { id, email, password, passwordCheck } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    console.log(user);
  };
  return (
    <>
      <input name="id" value={id} onChange={handleChange} />
      <input name="email" value={email} onChange={handleChange} />
      <input name="password" value={password} onChange={handleChange} />
      <input
        name="passwordCheck"
        value={passwordCheck}
        onChange={handleChange}
      />
      <button type={'submit'} onClick={handleClick}>
        Submit
      </button>
    </>
  );
};

export default Login;
