const express = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

const {
  getPokemonByName,
  dbPokemons,
  getAllPokemons,
  getPokemonById,
  createPokemon,
  deletePokemon,
} = require("../controllers/Controllers");

router.get("/", async (req, res) => {
  const name = req.query.name;

  if (name) {
    const pokemonByName = await getPokemonByName(name);

    if (pokemonByName) return res.status(200).send(pokemonByName);
    else {
      const pokemonFromDbByName = await dbPokemons().then((res) =>
        res.filter(
          (p) => p.name.toLowerCase().trim() === name.toLowerCase().trim()
        )
      );

      if (pokemonFromDbByName.length > 0)
        return res.status(200).send(pokemonFromDbByName);
      else
        return res
          .status(404)
          .send(`Pokemon con este nombre ${name} no se ha encontrado`);
    }
  } else {
    const allPokemons = await getAllPokemons();

    return res.status(200).send(allPokemons);
  }
});

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  if (idPokemon) {
    const pokemonById = await getPokemonById(idPokemon);

    if (Array.isArray(pokemonById) && pokemonById.length > 0)
      return res.status(200).send(pokemonById);
    else {
      const pokemonFromDb = await dbPokemons().then((res) =>
        res.filter((p) => p.id === idPokemon)
      );
      if (pokemonFromDb.length > 0) return res.status(200).send(pokemonFromDb);
      else
        res
          .status(404)
          .send(`Pokemon con este nombre ${idPokemon} no se ha encontrado`);
    }
  } else
    res.status(404).send(`Pokemon con este id ${idPokemon} no se ha encontrado`);
});

router.post("/", async (req, res) => {
  const {
    name,
    height,
    weight,
    health,
    attack,
    defense,
    speed,
    fromDb,
    types,
    img,
  } = req.body;

  const newPokemon = await createPokemon(
    name,
    height,
    weight,
    health,
    attack,
    defense,
    speed,
    fromDb,
    types,
    img
  );

  return res.status(200).send(newPokemon);
});

router.delete("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  if (idPokemon) {
    const delPokemon = await deletePokemon(idPokemon);
    return res.status(200).send(delPokemon);
  } else
    res.status(404).send(`Pokemon ${idPokemon} no se ha eliminado`);
});

module.exports = router;
