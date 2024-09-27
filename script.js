const cloudOutput = document.querySelector(".cloud");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelector(".name");
let app = document.querySelector(".weather-app");
const allCities = document.querySelectorAll(".allCities");
const recentSearchesContainer = document.querySelector(".recent-searches"); // For displaying recent searches

let cityInput = "London";

// Function to update UI with weather data
function updateUIWithData(data) {
    cities.innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°";
    document.querySelector(".time").innerHTML = data.location.localtime;
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".cloud").innerHTML = data.current.cloud + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.current.wind_kph) + "km/h";
    document.querySelector(".wind-direction").innerHTML = data.current.wind_dir;
    const weatherIcon = document.querySelector(".icon");
    weatherIcon.src = data.current.condition.icon;

    const weatherCondition = document.querySelector(".condition").innerHTML = data.current.condition.text;

    // Change background based on weather condition
    if (weatherCondition === "Sunny") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/sunny.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/sunny.jpg')";
        }
    } else if (weatherCondition === "Cloudy") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Overcast.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Overcast.jpg')";
        }
    } else if (weatherCondition === "Overcast") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Overcast.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Overcast.jpg')";
        }
    } else if (weatherCondition === "Heavy rain"
        || weatherCondition === "Moderate or heavy freezing rain") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Heavy Rain.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Heavy Rain.jpg')";
        }
    } else if (weatherCondition === "Light snow") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/light snow.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Night/light snow.jpg')";
        }
    } else if (weatherCondition === "Partly cloudy") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Partly Cloudly.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/partly cloudly.jpg')";
        }
    } else if (weatherCondition === "Light rain") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Light Rain.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Light Rain.jpg')";
        }
    } else if (weatherCondition === "Light rain shower") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Light Rain.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Light Rain.jpg')";
        }
    } else if (weatherCondition === "Mist") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/mist.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/mist.jpg')";
        }
    } else if (weatherCondition === "Light drizzle") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/light drizzel.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Light Rain.jpg')";
        }
    } else if (weatherCondition === "Patchy rain possible") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/light drizzel.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Light Rain.jpg')";
        }
    } else if (weatherCondition === "Heavy snow"
        || weatherCondition === "Moderate snow"
        || weatherCondition === "Patchy heavy snow"
        || weatherCondition === "Patchy moderate snow") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/heavy snow.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/heavy snow.jpg')";
        }

    } else if (weatherCondition === "Moderate or heavy rain with thunder"
        || weatherCondition === "Patchy light snow with thunder"
        || weatherCondition === "Moderate rain at times") {
        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Moderate or heavy rain with thunder.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Moderate or heavy rain with thunder.jpg')";
        }

    } else if (weatherCondition === "Moderate rain"
        || weatherCondition === "Moderate rain at times"
        || weatherCondition === "Moderate or heavy rain shower") {

        if (data.current.is_day == "0") {
            app.style.backgroundImage = "url('Images/Night/Moderate or heavy rain shower.jpg')";
        } else {
            app.style.backgroundImage = "url('Images/Day/Moderate or heavy rain shower.jpg')";
        }
    } else {
        app.style.background = "linear-gradient(90deg, rgba(0,35,36,1) 0%, rgba(20,163,237,1) 0%, rgba(4,217,196,1) 100%, rgba(3,10,11,1) 100%, rgba(117,11,11,1) 100%)";
    }
}

// Function to fetch weather data
function api(cityName) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=aef59e22865b4690a5b72015242409&q=${cityName}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("weatherData", JSON.stringify(data));
            updateUIWithData(data);
            addRecentSearch(cityName);  // Add city to recent searches
        })
        .catch(error => console.error("Error fetching data:", error));
}

function addRecentSearch(cityName) {
    let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    // Remove the city if it's already in the list, to avoid duplicates
    recentSearches = recentSearches.filter(city => city !== cityName);

    // Add the new search to the beginning of the array
    recentSearches.unshift(cityName);

    // Limit to 4 recent searches
    if (recentSearches.length > 4) {
        recentSearches = recentSearches.slice(0, 4);
    }

    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    displayRecentSearches();
}

// Display recent searches
function displayRecentSearches() {
    let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    recentSearchesContainer.innerHTML = '';
    recentSearches.forEach(city => {
        let cityElement = document.createElement("li");
        cityElement.classList.add("city");
        cityElement.innerHTML = city;
        cityElement.addEventListener("click", () => api(city));
        recentSearchesContainer.appendChild(cityElement);
    });
}



// Attach event listener to the search button
btn.addEventListener("click", () => {
    const cityName = search.value;
    if (cityName) {
        api(cityName);
        search.value = '';
    } else {
        alert("Please enter a city name");
    }
});

// On page load, retrieve data from localStorage
window.addEventListener("load", () => {
    const savedData = localStorage.getItem("weatherData");
    if (savedData) {
        const data = JSON.parse(savedData);
        updateUIWithData(data);
    }
    displayRecentSearches();  // Display recent searches on load
});
