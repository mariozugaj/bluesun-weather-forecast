export function round(number, precision = 4) {
  const shift = (number, precision, reverseShift) => {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? +numArray[1] + precision : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

export function geocode(coordinates) {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: coordinates }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const filtered = results.filter(loc => loc.types.includes("locality"));
          if (filtered[0]) {
            const {
              formatted_address,
              geometry: { location },
              place_id,
            } = filtered[0];

            return resolve({
              label: formatted_address,
              lat: location.lat(),
              lng: location.lng(),
              placeId: place_id,
            });
          }
        } else {
          return reject(window.alert("No results found"));
        }
      } else {
        return reject(window.alert("Geocoder failed due to: " + status));
      }
    });
  });
}

export function coordinatesToString({ lat, lng }) {
  return `${round(lat)},${round(lng)}`;
}

export function extractCoordinates(coordinatesString) {
  const params = coordinatesString.split(",").map(parseFloat);
  return { lat: params[0], lng: params[1] };
}
