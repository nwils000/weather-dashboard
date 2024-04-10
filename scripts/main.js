import axios from 'axios';

async function getLocationData() {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a807a687d13abc248b97f802908105d1`
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

let longitude = null;
let latitude = null;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  longitude = position.coords.longitude;
  latitude = position.coords.latitude;
  getLocationData();
}

getLocation();
