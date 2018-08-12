import classNames from "classnames";

const coordinatesRegexp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export function round(number, precision = 6) {
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
    let extracted;
    try {
      extracted = extractCoordinates(coordinates);
    } catch (error) {
      reject(error);
    }

    const defaultResult = {
      label: "Middle of nowhere",
      coordinates: extracted.join(","),
    };
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat: extracted[0], lng: extracted[1] };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        resolve({
          label: results[0].formatted_address,
          coordinates: extracted.join(","),
        });
      } else {
        resolve(defaultResult);
      }
    });
  });
}

export function coordinatesToString({ lat, lng }) {
  return `${round(lat)},${round(lng)}`;
}

function validCoordinates(coordinates) {
  return coordinatesRegexp.test(coordinates);
}

export function trimCoordinates(coordinates) {
  return coordinates.split(",").map(coordinate => {
    parseFloat(coordinate);
    return round(coordinate);
  });
}

export function extractCoordinates(coordinates) {
  if (!validCoordinates(coordinates)) {
    throw new Error("Not valid coordinates");
  }
  return trimCoordinates(coordinates);
}

export function nextDays(n) {
  return function() {
    const days = ["Today"];
    const names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });
    let index = names.indexOf(today);

    for (let i = 1; i < n; i++) {
      index === names.length - 1 ? (index = 0) : index++;
      days.push(names[index]);
    }
    return days;
  };
}

export function titleize(string) {
  return string.replace(/^[a-z]|[A-Z]/g, (v, i) => {
    return i === 0 ? v.toUpperCase() : " " + v.toUpperCase();
  });
}

export function uvClass(uvIndex) {
  return classNames({
    uv: true,
    green: uvIndex <= 2.9,
    yellow: uvIndex >= 3 && uvIndex <= 5.9,
    orange: uvIndex >= 6 && uvIndex <= 7.9,
    red: uvIndex >= 8 && uvIndex <= 10.9,
    violet: uvIndex >= 11,
  });
}

export function tempClass(temperature, freezingPoint) {
  return classNames({
    "temperature--warm": temperature > freezingPoint,
    "temperature--cold": temperature <= freezingPoint,
  });
}
