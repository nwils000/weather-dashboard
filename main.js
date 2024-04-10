import axios from 'axios';

// START MVP

// GET LOCATION DATA
let result = null;
async function getLocationData() {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a807a687d13abc248b97f802908105d1`
    );
    result = res.data;
    console.log(result);
    displayInformation();
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

// ADDING LOCATION DATA TO DOM
function displayInformation() {
  let city = document.querySelector('.city-body');
  city.textContent = result.name;
  let tempK = document.querySelector('#temp-k');
  tempK.textContent = `${result.main.temp}K`;
  let tempF = document.querySelector('#temp-f');
  tempF.textContent = convertKtoF(result.main.temp);
  let tempC = document.querySelector('#temp-c');
  tempC.textContent = convertKtoC(result.main.temp);
  let condition = document.querySelector('.condition-body');
  condition.textContent = result.weather[0].main;
  let otherInfo = document.querySelector('.other-info-body');
  let otherInfoImage = document.createElement('img');
  otherInfoImage.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
  );
  otherInfo.textContent = '';
  otherInfo.appendChild(otherInfoImage);
}

function convertKtoF(kelvin) {
  return `${(((kelvin - 273.15) * 9) / 5 + 32).toFixed(2)}°F`;
}

function convertKtoC(kelvin) {
  return `${(kelvin - 273.15).toFixed(2)}°C`;
}

// END MVP

/* <body>
    <div class="content-wrapper">
      <h1>Weather App</h1>
      <div class="info-wrapper">
        <div class="city-wrapper">
          <div class="city-heading">City</div>
          <div class="city-body"></div>
        </div>
        <div class="temperature-wrapper">
          <div class="temperature-heading">Temperature</div>
          <div class="temperature-body">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="condition-wrapper">
          <div class="condition-heading">Condition</div>
          <div class="condition-body"></div>
        </div>
        <div class="other-info-wrapper">
          <div class="other-info-heading">Other Info</div>
          <div class="other-info-body"></div>
        </div>
      </div>
    </div>
    <script defer src="./scripts/main.js"></script>
  </body> */
