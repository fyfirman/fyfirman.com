import { createStore, combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import counterReducer from "./counterReducer";
import cartReducer from "./cartReducer";

const initialValue = {
  key: "Hello world",
};

const combinedReducer = combineReducers({ counter: counterReducer, cart: cartReducer });

const rootReducer = (state = initialValue, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

// create a makeStore function
const makeStore = () => createStore(rootReducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
