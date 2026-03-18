const API_KEY = "ad85876333aeca487dfc9fe18b923f40";

const logOutput = document.getE95f92a4c09e7551dc56d61b65e51210lementById("logOutput");
const searchBtn = document.getElementById("searchBtn");

function logMessage(msg) {
    logOutput.innerHTML += msg + "\n";
}

searchBtn.addEventListener("click", fetchWeather);

async function fetchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    logOutput.innerHTML = "";
    logMessage("[ASYNC] Fetch started");

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) {
            showError(true);
            return;
        }

        showError(false);

        document.getElementById("city").textContent =
            data.name + ", " + data.sys.country;

        document.getElementById("temp").textContent =
            data.main.temp + " °C";

        document.getElementById("weather").textContent =
            data.weather[0].main;

        document.getElementById("humidity").textContent =
            data.main.humidity + "%";

        document.getElementById("wind").textContent =
            data.wind.speed + " m/s";

        addHistory(city);
        logMessage("[ASYNC] Data received");

    } catch {
        showError(true);
        logMessage("[ASYNC] Error");
    }
}

function showError(flag) {
    document.getElementById("errorBox").style.display = flag ? "block" : "none";
    document.getElementById("weatherData").style.display = flag ? "none" : "block";
}

function addHistory(city) {
    const historyDiv = document.getElementById("historyList");

    const exists = Array.from(historyDiv.children)
        .some(btn => btn.textContent.toLowerCase() === city.toLowerCase());

    if (exists) return;

    const btn = document.createElement("button");
    btn.textContent = city;

    btn.onclick = () => {
        document.getElementById("cityInput").value = city;
        fetchWeather();
    };

    historyDiv.appendChild(btn);
}