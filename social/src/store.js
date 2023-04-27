import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  results: [],
  numResults: 0,
  clubData: {},
  currentRatings: { Clout: 0, Vibes: 0, Inclusivity: 0, Intensity: 0 },
  previousRatings: { Clout: 0, Vibes: 0, Inclusivity: 0, Intensity: 0 },
  globalRatings: { Clout: 0, Vibes: 0, Inclusivity: 0, Intensity: 0 },
  currentlyRating: false,
  // checks if the club has been rated so far
  hasOneUserRtg: false,
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
    case "SET_HAS_USER_RATING":
      return {
        ...state,
        hasOneUserRtg: action.payload.hasOneUserRtg,
      };
    // case "SET_USER":
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //   };
    case "SET_GLOBAL_RATINGS":
      return {
        ...state,
        globalRatings: action.payload.globalRatings,
      };
    case "SET_PREVIOUS_RATINGS":
      return {
        ...state,
        previousRatings: action.payload.previousRatings,
      };
    // set current ratings by type of rating
    case "SET_CURRENT_RATINGS":
      return {
        ...state,
        currentRatings: {
          ...state.currentRatings,
          [action.payload.type]: action.payload.rating,
        },
      };
    case "SET_CURRENTLY_RATING":
      return {
        ...state,
        currentlyRating: action.payload.currentlyRating,
      };
    case "SET_CURRENT_RATINGS_ALL":
      return {
        ...state,
        currentRatings: action.payload.currentRatings,
      };
    case "RESET_ALL_RATINGS":
      return {
        ...state,
        currentRatings: {
          Clout: 0,
          Vibes: 0,
          Inclusivity: 0,
          Intensity: 0,
        },
        previousRatings: {
          Clout: 0,
          Vibes: 0,
          Inclusivity: 0,
          Intensity: 0,
        },
    /*     globalRatings: {
          Clout: 0,
          Vibes: 0,
          Inclusivity: 0,
          Intensity: 0,
        }, */
        currentlyRating: false,
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
