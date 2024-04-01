// services/countries.js
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const openWeatherMapBaseUrl = "https://api.openweathermap.org/data/2.5/";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getWeatherByCity = (city) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const url = `${openWeatherMapBaseUrl}/weather?q=${city}&appid=${api_key}&units=metric`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getWeatherByCity,
};
