import axios from 'axios';
import cloud from './images/cloud.jpg';
import rain from './images/rain.jpeg';
import storm from './images/storm.jpg';
import sun from './images/sun.jpg';

// START MVP

// GET LOCATION DATA
let result = null;
let longitude = null;
let latitude = null;
async function getCityLatAndLong(zipCode) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=a807a687d13abc248b97f802908105d1`
    );
    result = res.data;
    console.log(result);
    latitude = result.lat;
    longitude = result.lon;
    getLocationData();
  } catch (err) {
    console.log(err);
    document.querySelector('.error-message2').style.display = 'block';
    document.querySelector('.error-message2').textContent =
      "That's not a real place...";
    throw err;
  }
}

// TODO: instead of listening for click of button, listen for submit of the form element
document.querySelector('.info-1-submit').addEventListener('click', () => {
  let zipCode = document.querySelector('.info-1').value;

  getCityLatAndLong(zipCode);
});

getCityLatAndLong('40515');

async function getLocationData() {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a807a687d13abc248b97f802908105d1`
    );
    result = res.data;
    console.log(result);
    // Easier to debug the program when data flows more directly
    displayInformation(res.data);
    displayCustomInformation(res.data);
  } catch (err) {
    console.log(`error ${err}`);
    document.querySelector('.error-message2').style.display = 'block';
    document.querySelector('.error-message2').textContent =
      "That's not a real place...";
    throw err;
  }
}

// ADDING LOCATION DATA TO DOM
function displayInformation({ name, main, weather }) {
  let city = document.querySelector('.city-body');
  city.textContent = name;
  let tempK = document.querySelector('#temp-k');
  tempK.textContent = `${main.temp}K`;
  let tempF = document.querySelector('#temp-f');
  tempF.textContent = convertKtoF(main.temp);
  let tempC = document.querySelector('#temp-c');
  tempC.textContent = convertKtoC(main.temp);
  let condition = document.querySelector('.condition-body');
  condition.textContent = weather[0].main;
  let otherInfo = document.querySelector('.other-info-body');
  let otherInfoImage = document.createElement('img');
  otherInfoImage.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
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

function displayCustomInformation({ name, main, wind, weather }) {
  document.querySelector('.city').textContent = name;
  document.querySelector('.info-2').textContent = main.humidity;
  document.querySelector('.info-3').textContent = `${wind.speed} mph`;
  function degreesToCompass(degrees) {
    if (degrees >= 348.75 || degrees < 11.25) return 'N';
    else if (degrees >= 11.25 && degrees < 33.75) return 'NNE';
    else if (degrees >= 33.75 && degrees < 56.25) return 'NE';
    else if (degrees >= 56.25 && degrees < 78.75) return 'ENE';
    else if (degrees >= 78.75 && degrees < 101.25) return 'E';
    else if (degrees >= 101.25 && degrees < 123.75) return 'ESE';
    else if (degrees >= 123.75 && degrees < 146.25) return 'SE';
    else if (degrees >= 146.25 && degrees < 168.75) return 'SSE';
    else if (degrees >= 168.75 && degrees < 191.25) return 'S';
    else if (degrees >= 191.25 && degrees < 213.75) return 'SSW';
    else if (degrees >= 213.75 && degrees < 236.25) return 'SW';
    else if (degrees >= 236.25 && degrees < 258.75) return 'WSW';
    else if (degrees >= 258.75 && degrees < 281.25) return 'W';
    else if (degrees >= 281.25 && degrees < 303.75) return 'WNW';
    else if (degrees >= 303.75 && degrees < 326.25) return 'NW';
    else if (degrees >= 326.25 && degrees < 348.75) return 'NNW';
  }
  let windDegrees = wind.deg;
  let compassDirection = degreesToCompass(windDegrees);
  document.querySelector('.info-4').textContent = compassDirection;
  document.querySelector('.weather-type').textContent = weather[0].main;
  document.querySelector('.weather-desc').textContent =
    weather[0].description;
  document.querySelector('.temp').textContent = convertKtoF(main.temp);
  document.querySelector(
    '.main-custom-content'
  ).style.background = `url(${getWeatherImgSrc(weather[0].main)})`;
  document.querySelector('.main-custom-content').style.backgroundSize = 'cover';
  document.querySelector(
    '.custom-content-image'
  ).style.background = `url(${getWeatherImgSrc(weather[0].main)})`;
  document.querySelector('.custom-content-image').style.backgroundSize =
    'cover';

  function getWeatherImgSrc(weatherString) {
    // use switch case fall through behavior
    switch (weatherString) {
      case 'Clouds':
      case 'Squall':
      case 'Ash':
      case 'Dust':
      case 'Sand':
      case 'Fog':
      case 'Dust':
      case 'Haze':
      case 'Smoke':
      case 'Mist':
      case 'Snow':
        return cloud;
      case 'Rain':
      case 'Drizzle':
        return rain;
      case 'Clear':
        return sun;
      case 'Tornado':
      case 'Thunderstorm':
        return storm;
      default:
        return ''
    }
  }
}

let bodyAnchor = document.getElementById('body');
elementCreator('main', bodyAnchor, '1');
elementCreator('section', '1', '2');
elementCreator('section', '1', '3');
elementCreator('section', '1', '4');
elementCreator('div', '3', 'myDiv');

function elementCreator(child, parentId, id) {
  let element = document.createElement(child);
  element.setAttribute('id', id);
  let parentElement = document.getElementById(parentId);
  if(parentElement) parentElement.appendChild(element);
}
