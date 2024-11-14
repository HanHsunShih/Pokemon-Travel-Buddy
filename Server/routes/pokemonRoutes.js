import express from "express";
import readPokemon from "../utils/helpers.js";

const router = express.Router();

router.get("/", (req, res) => {
  const fileContent = readPokemon();

  res.status(200).json(fileContent);
});

export default router;
