// Search bar
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

submit.addEventListener('click', (e) => {
  e.preventDefault();
  searchLocation(search.value);
});

// Set elements
function setId(element, value) {
  document.querySelector(`#${element}`).textContent = value;
}

function setClass(element, value) {
  document.querySelector(`.${element}`).textContent = value;
}

// Preferences
const tempBtn = document.querySelector('#pref-temp');
const windBtn = document.querySelector('#pref-wind');

let prefTemp = tempBtn.textContent;
let prefWind = windBtn.textContent;

tempBtn.addEventListener('click', () => {
  if (tempBtn.textContent === 'Celsius') {
    tempBtn.textContent = 'Farenheit';
  } else {
    tempBtn.textContent = 'Celsius';
  }
  prefTemp = tempBtn.textContent;
  displayData(weather);
});

windBtn.addEventListener('click', () => {
  if (windBtn.textContent === 'Km/h') {
    windBtn.textContent = 'Mph';
  } else {
    windBtn.textContent = 'Km/h';
  }
  prefWind = windBtn.textContent;
  displayData(weather);
});

// Fetch and display data from API
async function getWeather(city = 'Tlemcen') {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7525db5af7ea409a95f145846240803&q=${city}&days=3`);
    const result = await response.json();
    return result;
  
  } catch(error) {
      alert(error);
  }
}

let weather;

getWeather().then((response) => {
  weather = response;
  displayData(weather);
});

function searchLocation(location = 'Tlemcen') {
  getWeather(location).then((response) => {
    weather = response;
    displayData(weather);
 })
}

function displayData(response) {
  setId('location', `${response.location.name}, ${response.location.country}`);
  displayNowCard(response);
  const date2 = new Date(response.forecast.forecastday[2].date);
  setId('day0', `Today`);
  setId('day1', `Tomorrow`);
  setId('day2', `${dayWeek(date2.getDay())}`);
  displayForecast(response.forecast.forecastday[day]);

}

function displayNowCard(response) {
  const date = new Date(response.forecast.forecastday[day].date);
  setId('time', `${dayWeek(date.getDay())}, ${month(date.getMonth())} ${dayMonth(date.getUTCDate())} ${date.getFullYear()}`);
  const now = new Date(response.current.last_updated)
  setId('now', `${now.getHours()}:${now.getMinutes()}`);
  setId('condition', response.current.condition.text);
  if (prefTemp === 'Celsius') {
    setId('temperature', `${response.current.temp_c}°C`);
  } else {
    setId('temperature', `${response.current.temp_f}°F`);
  }
  setId('humidity', `Humidity: ${response.current.humidity}%`);
  if (prefWind === 'Km/h') {
    setId('wind', `Wind: ${response.current.wind_dir}, ${response.current.wind_kph}Km/h`)
  } else {
    setId('wind', `Wind: ${response.current.wind_dir}, ${response.current.wind_mph}Mph`)
  }
  document.querySelector('.card-now').style.backgroundImage = `url(${response.current.condition.icon})`;
}

let day = 0;
const selectBtns = document.querySelectorAll('.select-day');
selectBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    day = parseInt(btn.id.slice(-1));
    displayData(weather);
    document.querySelector('.active').classList.remove('active');
    btn.classList.add('active');
  })
})

function displayForecast(response) {
  document.querySelector('.card-forecast').style.backgroundImage = `url(${response.day.condition.icon})`
  setId('forecast-condition', response.day.condition.text);
  if (prefTemp === 'Celsius') {
    setId('min-temp', `min: ${response.day.mintemp_c}°C`);
    setId('max-temp', `max: ${response.day.maxtemp_c}°C`);
  } else {
    setId('min-temp', `min: ${response.day.mintemp_f}°F`);
    setId('max-temp', `max: ${response.day.maxtemp_f}°F`);
  }
  if (response.day.daily_will_it_rain === 1) {
    setId('rain-chance', `Chances for rain: ${response.day.daily_chance_of_rain}%`);
  } else {
    setId('rain-chance', ``);
  }
  if (response.day.daily_will_it_snow === 1) {
    setId('snow-chance', `Chances for rain: ${response.day.daily_chance_of_snow}%`);
  } else {
    setId('snow-chance', ``);
  }
}

// date functions
function dayWeek(value) {
  let result;
  switch (value) {
    case 0:
      result = 'Sunday';
      break;
    case 1: 
      result = 'Monday';
      break;
    case 2:
      result = 'Tuesday';
      break;
    case 3: 
      result = 'Wednsday';
      break;
    case 4: 
      result = 'Thursday';
      break;
    case 5:
      result = 'Friday';
      break;
    case 6:
      result = 'Saturday';
      break;
  }

  return result;
}

function dayMonth(value) {
  let result;
  if (value === 1) {
    result = `${value}st`;
  } else if (value === 2) {
    result = `${value}nd`;
  } else {
    result = `${value}th`;
  }

  return result;
}

function month(value) {
  let result;
  switch (value + 1) {
    case 1:
      result = 'january';
      break;
    case 2:
      result = 'february';
      break;
    case 3:
      result = 'mars';
      break;
    case 4:
      result = 'april';
      break;
    case 5:
      result = 'may';
      break;
    case 6:
      result = 'june';
      break;
    case 7:
      result = 'july';
      break;
    case 8:
      result = 'august';
      break;
    case 9:
      result = 'september';
      break;
    case 10:
      result = 'october';
      break;
    case 11:
      result = 'november';
      break;
    case 12:
      result = 'december';
      break;
  }

  return result;
}
