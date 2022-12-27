import React from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../utils/functions";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className='title'>Dashboard</h1>
      <h2 className='subtitle'>
        Welcome back <strong>{user && capitalizeFirstLetter(user.name)}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
