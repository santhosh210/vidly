const express = require("express");
const router = express.Router();
const validateGenre = require("../validations/genreValidation");
const Genre = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectID");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.status(200).send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send({
      message: "The genre with the ID was not found, try with different ID",
    });
  }
  res.status(200).send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  // res.status(201).send({ message: "added successfully", genre });
  res.status(201).send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre) {
    res.status(404).send({
      message: "The genre with the ID was not found, try with different ID",
    });
  }
  res.status(200).send({ message: "Updated Successfully", genre });
});

router.delete("/:id", auth, admin, async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) {
    res.status(404).send({
      message: "The genre with the ID was not found, try with different ID",
    });
  }
  res.status(200).send({ message: "Deleted Successfully", genre });
});
module.exports = router;
