import fs from "fs";

const readPokemon = () => {
  try {
    const fileContent = fs.readFileSync("./data/pokemon.json", "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.log("Error reading from file ", error);
  }
};

export default readPokemon;
