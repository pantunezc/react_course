// Weather.js
import React, { useState, useEffect } from "react";
import countryService from "../services/countries";

function convertIconId(id) {
  const codes = {
    200: "11d",
    201: "11d",
    202: "11d",
    210: "11d",
    211: "11d",
    212: "11d",
    221: "11d",
    230: "11d",
    231: "11d",
    232: "11d",
    300: "09d",
    301: "09d",
    302: "09d",
    310: "09d",
    311: "09d",
    312: "09d",
    313: "09d",
    314: "09d",
    321: "09d",
    500: "10d",
    501: "10d",
    502: "10d",
    503: "10d",
    504: "10d",
    511: "13d",
    520: "09d",
    521: "09d",
    522: "09d",
    531: "09d",
    600: "13d",
    601: "13d",
    602: "13d",
    611: "13d",
    612: "13d",
    613: "13d",
    615: "13d",
    616: "13d",
    620: "13d",
    621: "13d",
    622: "13d",
    701: "50d",
    711: "50d",
    721: "50d",
    731: "50d",
    741: "50d",
    751: "50d",
    761: "50d",
    762: "50d",
    771: "50d",
    781: "50d",
    800: "01d",
    801: "02d",
    802: "03d",
    803: "04d",
    804: "04d",
  };

  return codes[id];
}

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countryService
      .getWeatherByCity(city)
      .then((weatherData) => {
        setWeatherData(weatherData);
      })
      .catch((error) => {
        console.error("Error al obtener la información del tiempo:", error);
      });
  }, [city]);

  return (
    <>
      {weatherData && (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          {weatherData.weather && weatherData.weather[0].id && <img src={`https://openweathermap.org/img/wn/${convertIconId(weatherData.weather[0].id)}.png`} alt={weatherData.weather[0].description} />}
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default Weather;
