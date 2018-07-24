const VISIT_LOCATION = "VISIT_LOCATION";

export function visitLocation(location) {
  return {
    type: VISIT_LOCATION,
    payload: {
      location: { ...location },
      visitedAt: Date.now(),
    },
  };
}

const initialState = {
  "28.763204,-17.893081": {
    id: "28.763204,-17.893081",
    visitedAt: 1532440211059,
    label: "Observatorio del Roque de los Muchachos",
    lat: 28.763204,
    lng: -17.893081,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case VISIT_LOCATION:
      return {
        ...state,
        [action.payload.location.id]: {
          visitedAt: action.payload.visitedAt,
          ...action.payload.location,
        },
      };
    default:
      return state;
  }
}
