/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "~/redux/store";

const Demo = (props) => {
  const { counter } = props;
  const [incrementValue, setIncrementValue] = useState();
  const dispatch = useDispatch();

  // actions
  const handleButtonIncrement = () => {
    dispatch({
      type: "INCREMENT",
      payload: incrementValue,
    });
  };

  return (
    <div>
      <p>counter: {counter}</p>

      <input onChange={(e) => setIncrementValue(e.target.value)} value={incrementValue} />
      <button onClick={handleButtonIncrement}>Increment</button>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  // fetching
  console.log(store.getState());

  return {
    props: store.getState(),
  };
});

export default connect((state) => state)(Demo);
