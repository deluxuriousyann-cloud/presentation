const qs = (selector) => document.querySelector(selector)
const qsa = (selector) => document.querySelectorAll(selector)

const API_KEY = '55f44f69542bdcc92ba9ef0343f77bef'; //ayaw intawon ni gamita

const input = qs('.userInput')
const display = qs('.weatherDisplay')

let CITY_NAME = 'Manila';

async function getWeather() {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`);
        if (!res.ok) {
            console.error('an error occured: status: ' + res.status)
            return;
        }
        const data = await res.json();
        console.log(data)
        return data;
    } catch (err) {
        display.textContent = 'An error occured: "' + CITY_NAME + '" not found.'
    }
}

input.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;

    CITY_NAME = input.value;
    const data = await getWeather(input.value);
    displayData(data);
})

function displayData(data) {
    display.innerHTML = `Location: <b>${data.name}</b>, ${data.sys.country} <br>`;
    display.innerHTML += `Weather: <b>${data.weather[0].main}</b> (${data.weather[0].description}) <br>`;
    display.innerHTML += `Humidity: <b>${data.main.humidity}</b>% <br>`;
    display.innerHTML += `Pressure: <b>${data.main.pressure}</b> hPa <br>`;
    display.innerHTML += `Visibility: <b>${data.visibility}</b> meters <br>`;
    display.innerHTML += `Feels Like: <b>${data.main.feels_like}</b> ºC <br>`;
    display.innerHTML += `Wind Gust: <b>${data.wind?.gust || 0}</b> m/s <br>`;
    display.innerHTML += `Wind Speed: <b>${data.wind?.speed || 0}</b> m/s <br>`;
    display.innerHTML += `Temperature: <b>${data.main.temp}</b> ºC <br>`;
    display.innerHTML += `Ground Level: <b>${data.main.grnd_level}</b> hPa <br>`;

}