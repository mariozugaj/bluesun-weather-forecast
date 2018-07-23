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
  "45.8149,15.9821": {
    id: "45.8149,15.9821",
    visitedAt: 1531919115731,
    label: "Trg Josipa Langa 2, 10000, Zagreb, Croatia",
    lat: 45.8149,
    lng: 15.9821,
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
