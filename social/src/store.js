import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  results: [],
  numResults: 0,
  clubData: {},
};

const reducer = (state = initialState, action) => {
  console.log("Current state:", state, "Action:", action);
  switch (action.type) {
    case "SET_RESULTS":
      return {
        ...state,
        results: action.payload.results,
        numResults: action.payload.numResults,
      };
    case "SET_CLUB_DATA":
      return {
        ...state,
        clubData: action.payload.clubData,
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
