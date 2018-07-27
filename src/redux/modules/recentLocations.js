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
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_RECENT_LOCATION,
      payload: {
        coordinates,
      },
    });
  };
}

export function moveRecentToFavorite(coordinates) {
  return {
    type: actionTypes.DELETE_RECENT_LOCATION,
    payload: {
      coordinates,
    },
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
