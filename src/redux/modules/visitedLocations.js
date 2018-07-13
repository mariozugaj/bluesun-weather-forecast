import { coordinatesToString } from "../../utils/utils";

const VISIT_LOCATION = "VISIT_LOCATION";

function visitLocation(location) {
  const coordinates = coordinatesToString({ lat: location.lat, lng: location.lng });
  return {
    type: VISIT_LOCATION,
    payload: {
      coordinates,
      location: { ...location },
    },
  };
}

function shouldVisitLocation(state, { lat, lng }) {
  const coordinates = coordinatesToString({ lat, lng });
  const location = state.visitedLocations[coordinates];

  if (!location) return true;
  return false;
}

export function visitLocationIfNeeded(location) {
  return (dispatch, getState) => {
    if (shouldVisitLocation(getState(), location)) {
      return dispatch(visitLocation(location));
    }
  };
}

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case VISIT_LOCATION:
      return {
        ...state,
        [action.payload.coordinates]: { ...action.payload.location },
      };
    default:
      return state;
  }
}
