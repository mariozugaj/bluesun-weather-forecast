import * as actionTypes from "redux/actionTypes";

export function startLoadingMap() {
  return {
    type: actionTypes.MAP_LOAD_BEGIN,
  };
}

export function mapLoaded() {
  return {
    type: actionTypes.MAP_LOAD_SUCCESS,
  };
}

const initialState = {
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MAP_LOAD_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.MAP_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
