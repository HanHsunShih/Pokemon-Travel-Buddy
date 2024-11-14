import express from "express";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import cors from "cors";

const app = express();
const port = 5055;

const { ORIGIN } = process.env;
app.use(cors());
app.get("/", (_req, res) => {
  res.send("Welcome to the API!");
});

app.use("/pokemon", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
