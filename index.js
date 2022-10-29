const form = document.getElementById('form');
const degree = document.querySelector('#degree');
const feelsLike = document.querySelector('#feels-like');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');

async function getAPI(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=imperial&appid=cbc3ace7804d231ef5d981f1fbba1729`, {mode: 'cors'})
        const data = await response.json();

        const lat = data[0].lat;
        const lon = data[0].lon
    
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=cbc3ace7804d231ef5d981f1fbba1729`, {mode: 'cors'})
        const weatherData = await weatherResponse.json();

        getWeatherData(weatherData);
     
    } catch(err) {
        alert('Location not found');
    }
}

const getWeatherData = (weatherData) => {
    const weatherInfo = weatherData.main;
    weatherInfo["feels_like"] = weatherData.main.feels_like;
    weatherInfo["description"] = weatherData.weather[0].description;
    weatherInfo["name"] = weatherData.name;
    weatherInfo["humidity"] = weatherData.main.humidity;
    weatherInfo["wind"] = weatherData.wind.speed / 2;
    weatherInfo["temp"], weatherInfo["temp"];

    for (const mph in weatherInfo) {
        if (typeof weatherInfo[mph] === 'number')
        weatherInfo[mph] = Math.round(weatherInfo[mph])
    }
 
    displayWeatherInfo(weatherInfo);
    fahrenheitToCelsius(weatherInfo);
    celsiusToFahrenheit(weatherInfo);
}

const fahrenheitToCelsius = (weatherInfo) => {
    const celsBtn = document.querySelector('.cels-btn');
    celsBtn.addEventListener("click", () => {
        let temperature = weatherInfo.temp;
        let maxTemp = weatherInfo.temp_max;
        let minTemp = weatherInfo.temp_min;
        let fahrToCel = (temperature - 32) / (1.800);
        let maxFahrToCel = (maxTemp - 32) / (1.800);
        let minFahrToCel = (minTemp - 32) / (1.800);

        feelsLike.textContent = `Feels like: ${Math.round(fahrToCel)}\u00B0C`;
        degree.textContent = Math.round(fahrToCel) +"\u00B0C";
        highTemp.textContent = `High: ${Math.round(maxFahrToCel)}\u00B0C`;
        lowTemp.textContent = `Low: ${Math.round(minFahrToCel)}\u00B0C`;  
    })
}

const celsiusToFahrenheit = (weatherInfo) => {
    const fahrBtn = document.querySelector('.fahr-btn');
    fahrBtn.addEventListener("click", () => {
        feelsLike.textContent = `Feels like: ${weatherInfo["feels_like"]}\u00B0F`;
        degree.textContent = `${weatherInfo.temp}\u00B0F`;
        highTemp.textContent = `High: ${weatherInfo.temp_max}\u00B0F`;
        lowTemp.textContent = `Low: ${weatherInfo.temp_min}\u00B0F`;
    })
}

const displayWeatherInfo = (weatherInfo) => {
    const city = document.querySelector('#city');
    const description = document.querySelector('#description');
    const wind = document.querySelector('#wind');
    const humidity = document.querySelector('#humidity');

    city.textContent = weatherInfo.name;
    feelsLike.textContent = `Feels like: ${weatherInfo["feels_like"]}\u00B0F`;
    degree.textContent = `${weatherInfo.temp}\u00B0F`;
    description.textContent = weatherInfo.description;
    highTemp.textContent = `High: ${weatherInfo.temp_max}\u00B0F`;
    lowTemp.textContent = `Low: ${weatherInfo.temp_min}\u00B0F`;
    wind.textContent = `Wind: ${weatherInfo.wind} mp/h`;
    humidity.textContent = `Humidity is ${weatherInfo.humidity}%`;

    if ( description.textContent.includes('clear sky') ) {
        document.body.classList.add('clearSky');
    } else if ( description.textContent.includes('scattered') || description.textContent.includes('few')) {
        document.body.classList.add('fewClouds');
    } else if ( description.textContent.includes('overcast clouds') ) {
        document.body.classList.add('overcast');
    } else if ( description.textContent.includes('broken') ) {
        document.body.classList.add('brokenClouds');
    } else if ( description.textContent.includes('light') ) {
        document.body.classList.add('lightRain');
    } else if ( description.textContent.includes('rain') ) {
        document.body.classList.add('rain')
    } else if ( description.textContent.includes('snow') ) {
        document.body.classList.add('snow');
    } else if ( description.textContent.includes('mist') ) {
        document.body.classList.add('mist');
    } else {
        document.body.style.backgroundImage = "url('images/jeremy-bishop-X3YzPHn3Jus-unsplash.jpeg')";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    getAPI(e.target[0].value);
    
    form.reset()
})




