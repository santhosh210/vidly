const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const validateRental = require("../validations/rentalValidation");
const Rental = require("../models/rental");
const Movie = require("../models/movie");
const Customer = require("../models/customer");
const auth = require("../middleware/auth");
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.status(200).send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res.status(400).send({ message: "Invalid customer" });
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res.status(400).send({ message: "Invalid movie" });
  }

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  rental = await rental.save();
  movie.numberInStock--;
  movie.save();

  res.status(201).send({ message: "added successfully", rental });
});

module.exports = router;
