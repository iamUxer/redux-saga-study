import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const { introduce } = useSelector((state) => {
    // redux 스토어의 상태를 조회한다.
    return state.user;
    // admin.js에서 업데이트한 updateIntroduce의 introduce 스토어의 상태값을 리턴한다.
  });

  return (
    <div>
      <h1>About</h1>
      <div>{introduce}</div>
    </div>
  );
};

export default About;
