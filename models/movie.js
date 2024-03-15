const mongoose = require("mongoose");
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 25,
    },
    genre: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minLength: 3,
          maxLength: 25,
        },
      }),
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

module.exports = Movie;
