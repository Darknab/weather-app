const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

function set(element, value) {
  document.querySelector(`#${element}`).textContent = value;
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  searchLocation(search.value);
});

async function getWeather(city = 'Tlemcen') {

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7525db5af7ea409a95f145846240803&q=${city}&days=3`);
    const result = await response.json();
    return result;
  
  } catch(error) {
      alert(error);
  }
}

function searchLocation(location) {
  getWeather(location).then((response) => {
    set('location', response.location.name);
    set('time', response.location.localtime);
    set('condition', response.current.condition.text);
    set('temperature', response.current.temp_c);
    set('humidity', response.current.humidity);
 })
}

getWeather('Tlemcen').then((response) => {
  console.log(response);
})

