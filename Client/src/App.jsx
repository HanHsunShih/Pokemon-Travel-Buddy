import { useState, useEffect } from "react";
import "./App.scss";
import WeatherForm from "./components/WeatherForm/WeatherForm";
import { fetchWeather } from "./utils/apiUtils.mjs";
import axios from "axios";
import weatherTypeMapping from "../data/typing";
import "./App.scss";

function App() {
  const API_KEY = "8666d7d05b744accbff103619241411";
  const base_URL = "http://api.weatherapi.com/v1/current.json";
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [weatherType, setWeatherType] = useState("");
  const [pokemonPhotos, setPokemonPhotos] = useState([]);
  const [weatherCondition, setWeatherCondition] = useState("");

  const fetchPokmeon = async () => {
    try {
      const response = await axios.get(`http://localhost:5055/pokemon`);
      // console.log(response.data);
      setPokemons(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `${base_URL}?key=${API_KEY}&q=${city}&aqi=no`
      );
      const condition = response.data.current.condition.text;
      setWeatherCondition(condition);
      const weatherTypeFromApi = weatherTypeMapping[condition];
      setWeatherType(weatherTypeFromApi);

      const filteredByType = pokemons.filter((pokemon) => {
        return pokemon.type === weatherTypeFromApi.toLowerCase();
      });

      // An empty array to store the pokemon images
      const imgUrls = [];

      // Loop over the filtered pokemon
      filteredByType.forEach((pokemon) => {
        // Call the function below, which gives us the imgUrl, but it's a promise
        const pokeImg = fetchPokemonPhoto(pokemon.name);

        // push the promise into an array
        imgUrls.push(pokeImg);
      });

      // Wait for all the promises to finish - all the URLS
      const result = await Promise.all(imgUrls);

      // Push all the URLS into state
      setPokemonPhotos(result);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchPokmeon();
  }, []);

  const fetchPokemonPhoto = async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      const pokeImg = response.data.sprites.front_default;

      return pokeImg;
    } catch {
      console.log("error");
    }
  };

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
      <div className="box">
        <img src="../assets/images/title.png" alt="" />
        <div className="bg">
          <h1>Which City you want to go?</h1>
          <WeatherForm handleSubmit={handleSubmit} />
          <h2>The weather is...{weatherCondition}</h2>
          <h2>Your best travel buddy is...</h2>
          <div>
            {pokemonPhotos.map((pokemonPhoto) => {
              return <img src={pokemonPhoto} alt="" />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
