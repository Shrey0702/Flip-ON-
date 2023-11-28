document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search");
    const locationInput = document.getElementById("location");
    const weatherInfo = document.getElementById("weather-info");

    searchButton.addEventListener("click", function () {
        const location = locationInput.value;

        if (location === "") {
            alert("Please enter a city.");
            return;
        }

        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = '8e9d5300c548aa0302151d81fc53848c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].description) {
                    const temperature = Math.round(data.main.temp - 273.15);
                    const description = data.weather[0].description;

                    weatherInfo.innerHTML = `
                        <h2>Weather in ${location}</h2>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Condition: ${description}</p>
                    `;
                } else {
                    weatherInfo.innerHTML = "<p>Weather data not found for this location.</p>";
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                weatherInfo.innerHTML = "<p>Failed to fetch weather data.</p>";
            });
    });
});