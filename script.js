function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "2f94d16e17f23f2522926440f8ba83a7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("weatherCard").classList.remove("hidden");
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("description").textContent = data.weather[0].description;
            document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById("details").textContent = `Humidity: ${data.main.humidity}% | Wind: ${Math.round(data.wind.speed)} m/s`;

            const iconCode = data.weather[0].icon;
            document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Icon">`;
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message);
        });
}
  