import * as actionTypes from "redux/actionTypes";

export function addRecentLocation(coordinates) {
  return {
    type: actionTypes.ADD_RECENT_LOCATION,
    payload: {
      coordinates,
    },
  };
}

export function deleteRecentLocation(coordinates) {
  return (dispatch, getState) => {
    const recentExists = getState().recentLocations.includes(coordinates);
    if (recentExists) {
      return dispatch({
        type: actionTypes.DELETE_RECENT_LOCATION,
        payload: {
          coordinates,
        },
      });
    } else {
      return Promise.resolve();
    }
  };
}

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_RECENT_LOCATION:
      return [...state, action.payload.coordinates];
    case actionTypes.DELETE_RECENT_LOCATION:
      const index = state.findIndex(location => location === action.payload.coordinates);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
