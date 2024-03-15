const express = require("express");
const router = express.Router();
const validateMovie = require("../validations/movieValidation");
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).send({
      message: "The movie with the ID was not found, try with different ID",
    });
  }
  res.status(200).send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send({ message: "Invalid genre" });
  }

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.status(201).send({ message: "added successfully", movie });
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    {
      new: true,
    }
  );

  if (!movie) {
    res.status(404).send({
      message: "The movie with the ID was not found, try with different ID",
    });
  }
  res.status(200).send({ message: "Updated Successfully", movie });
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    res.status(404).send({
      message: "The movie with the ID was not found, try with different ID",
    });
  }
  res.status(200).send({ message: "Deleted Successfully", movie });
});
module.exports = router;
