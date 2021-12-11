const initialValue = 0;

// useDispatch({
//   type: "INCREMENT",
//   payload: 10
// })

const counterReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (action.payload < 1) {
        return state;
      }
      if (!action.payload) {
        return state + 1;
      }
      return state + parseInt(action.payload, 10);
    case "DECREMENT":
      if (action.payload < 1) {
        return state;
      }
      if (!action.payload) {
        return state - 1;
      }
      return state - parseInt(action.payload, 10);
    default:
      return state;
  }
};

export default counterReducer;
