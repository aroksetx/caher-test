const url =
  "https://s3-ap-southeast-2.amazonaws.com/com-cochlear-sabretooth-takehometest/locations.json";

export const getLocationsList = () => {
  return fetch(url)
    .then(response => response.json())
    .catch(console.warn);
};

export const getDeviceCurrentLocation = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
