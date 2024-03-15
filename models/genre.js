const mongoose = require("mongoose");

var genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
