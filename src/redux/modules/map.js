const MAP_LOAD_BEGIN = "MAP_LOAD_BEGIN";
const MAP_LOAD_SUCCESS = "MAP_LOAD_SUCCESS";

export function startLoadingMap() {
  return {
    type: MAP_LOAD_BEGIN,
  };
}

export function mapLoaded() {
  return {
    type: MAP_LOAD_SUCCESS,
  };
}

const initialState = {
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MAP_LOAD_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case MAP_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
