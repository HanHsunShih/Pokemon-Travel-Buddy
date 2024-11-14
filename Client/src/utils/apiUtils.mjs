import axios from "axios";

const API_KEY = "8666d7d05b744accbff103619241411";
const base_URL = "http://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${base_URL}?key=${API_KEY}&q=${city}`);
  } catch {
    console.log("error");
  }
};
