const express = require("express");
const router = express.Router();
const validateMovie = require("../validations/movieValidation");
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const auth = require("../middleware/auth");
const asyncHandler = require("../middleware/async");
const dbFuntions = require("../helpers/dbFunctions");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // const movies = await Movie.find().sort("title");
    const movies = await dbFuntions.findAll("Movie");
    res.status(200).send(movies);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // const movie = await Movie.findById(req.params.id);
    const movie = await dbFuntions.findById("Movie", req.params.id);
    if (!movie) {
      res.status(404).send({
        message: "The movie with the ID was not found, try with different ID",
      });
    }
    res.status(200).send(movie);
  })
);

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // const genre = await Genre.findById(req.body.genreId);
    const genre = await dbFuntions.findById("Genre", req.body.genreId);
    if (!genre) {
      return res.status(400).send({ message: "Invalid genre" });
    }

    let movie = await dbFuntions.createOne("Movie", {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    res.status(201).send({ message: "added successfully", movie });
  })
);

router.put(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const movie = await dbFuntions.findByIdAndUpdate(
      "Movie",
      req.params.id,
      req.body
    );

    if (!movie) {
      res.status(404).send({
        message: "The movie with the ID was not found, try with different ID",
      });
    }
    res.status(200).send({ message: "Updated Successfully", movie });
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      res.status(404).send({
        message: "The movie with the ID was not found, try with different ID",
      });
    }
    res.status(200).send({ message: "Deleted Successfully", movie });
  })
);
module.exports = router;
