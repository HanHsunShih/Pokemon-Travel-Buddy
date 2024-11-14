import { useState, useEffect } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm/WeatherForm";
import { fetchWeather } from "./utils/apiUtils.mjs";
import axios from "axios";
// import "../data/typing";

function App() {
  const API_KEY = "8666d7d05b744accbff103619241411";
  const base_URL = "http://api.weatherapi.com/v1/current.json";

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`${base_URL}?key=${API_KEY}&q=${city}`);
      const condition = response.data.current.condition.text;
      console.log(condition);
    } catch {
      console.log("error");
    }
  };

  const fetchPokmeon = async () => {
    try {
      const response = await axios.get(`http://localhost:5055/pokemon`);
      console.log(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchPokmeon();
  }, []);

  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const city = event.target.city.value;
    console.log(city);
    fetchWeather(city);
    return;
  };

  return (
    <>
      <WeatherForm handleSubmit={handleSubmit} />
    </>
  );
}

export default App;
