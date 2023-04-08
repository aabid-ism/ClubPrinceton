import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  results: [],
  numResults: 0,
  clubData: {},
  ratings: { Clout: 5, Intensity: 5, Vibes: 5, Inclusivity: 5 },
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
    case "SET_RATING":
      return {
        ...state,
        ratings: {
          ...state.ratings,
          [action.payload.type]: action.payload.rating,
        },
      };
    case "GET_CLUB_RATINGS":
      return {
        ...state,
        ratings: action.payload.ratings,
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
