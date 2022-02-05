import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {
  const { users } = useSelector((state) => {
    // redux 스토어의 상태를 조회한다.
    return state.user;
    // admin.js에서 업데이트한 updateIntroduce의 introduce 스토어의 상태값을 리턴한다.
  });
  console.log('about::', users);

  const dummyUser = {
    name: 'lucky',
    email: 'yulrhymz@gmail.com',
    introduce: '멍멍',
  };

  return (
    <div>
      <h1>About</h1>
      <p>
        {dummyUser.name} | {dummyUser.email}
      </p>
      <div>{dummyUser.introduce}</div>
    </div>
  );
};

export default About;
