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
    displayCustomInformation();
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

let customModeButton = document.querySelector('.custom-mode-button');
let wireframeModeButton = document.querySelector('.wireframe-mode-button');

customModeButton.addEventListener('click', () => {
  wireframeModeButton.textContent = 'Wireframe Mode';
  customModeButton.textContent = '';
  document.querySelector('.content-wrapper').style.display = 'none';
  document.querySelector('.custom-content').style.display = 'block';
});

wireframeModeButton.addEventListener('click', () => {
  customModeButton.textContent = 'Custom Mode';
  wireframeModeButton.textContent = '';
  document.querySelector('.content-wrapper').style.display = 'block';
  document.querySelector('.custom-content').style.display = 'none';
});

function displayCustomInformation() {
  document.querySelector('.info-1').setAttribute('placeholder', result.name);
  document.querySelector('.info-2').textContent = result.main.humidity;
  document.querySelector('.info-3').textContent = result.wind.speed;
  document.querySelector('.info-4').textContent = result.wind.deg;
  document.querySelector('.weather-type').textContent = result.weather[0].main;
  document.querySelector('.weather-desc').textContent =
    result.weather[0].description;
}

/* <div class="custom-content">
      <div class="custom-content-image"></div>
      <div class="custom-content-overlay"></div>
      <div class="custom-content-wrapper">
        <button class="wireframe-mode-button">Custom mode</button>
        <div class="main-custom-content">
          <div class="side-info">
            <div class="info-1"></div>
            <div class="info-2"></div>
            <div class="info-3"></div>
            <div class="info-4"></div>
          </div>
          <div class="main-info">
            <div>
              <div class="weather-type"></div>
              <div class="weather-desc"></div>
            </div>
            <div class="temp"></div>
            <div class="temp summary"></div>
            <div class="weekly-temps">
              <div>Weekly Temps</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div> */
