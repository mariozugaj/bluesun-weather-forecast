import * as actionTypes from "redux/actionTypes";

export function startSearching() {
  return {
    type: actionTypes.START_SEARCHING,
  };
}

export function stopSearching() {
  return {
    type: actionTypes.STOP_SEARCHING,
  };
}

const initialState = {
  isSearching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_SEARCHING:
      return {
        ...state,
        isSearching: true,
      };
    case actionTypes.STOP_SEARCHING:
      return {
        ...state,
        isSearching: false,
      };
    default:
      return state;
  }
}
