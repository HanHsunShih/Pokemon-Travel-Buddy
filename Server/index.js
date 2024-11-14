import express from "express";
import pokemonRoutes from "./routes/pokemonRoutes.js";

const app = express();
const port = 5055;

app.use("/pokemon", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
