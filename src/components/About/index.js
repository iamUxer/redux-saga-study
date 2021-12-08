import React from "react";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
  const { introduce } = useSelector((state) => {
    return state.user;
  });

  return (
    <div>
      <h1>About</h1>
      <div>{introduce}</div>
    </div>
  );
};

export default About;
