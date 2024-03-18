const express = require("express");
const router = express.Router();
const validateGenre = require("../validations/genreValidation");
const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
const asyncHandler = require("../middleware/async");
const dbFunctions = require("../helpers/dbFunctions");
const cacheFunctions = require("../helpers/cacheFunctions");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const genres = await dbFunctions.findAll("Genre");
      res.status(200).send(genres);
    } catch (error) {
      console.log();
    }
  })
);

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     try {
//       const genres = await dbFunctions.findAll("Genre");
//       // Cache data in Redis using MongoDB keys
//       await Promise.all(
//         genres.map(async (genre) => {
//           await cacheFunctions.setValue(
//             genre._id.toString(),
//             JSON.stringify(genre)
//           );
//         })
//       );
//       res.status(200).send(genres);
//     } catch (error) {
//       console.error("Error retrieving genres:", error);
//       res.status(500).send({ message: "Internal server error" });
//     }
//   })
// );

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const genre = await dbFunctions.findById("Genre", req.params.id);
    if (!genre) {
      res.status(404).send({
        message: "The genre with the ID was not found, try with different ID",
      });
    }
    res.status(200).send(genre);
  })
);

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    let genre = await dbFunctions.createOne("Genre", { name: req.body.name });
    res.status(201).send(genre);
  })
);

router.put(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const genre = await dbFunctions.findByIdAndUpdate(
      "Genre",
      req.params.id,
      req.body
    );
    if (!genre) {
      res.status(404).send({
        message: "The genre with the ID was not found, try with different ID",
      });
    }
    res.status(200).send({ message: "Updated Successfully", genre });
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const genre = await dbFunctions.deleteOne("Genre", req.params.id);
    if (!genre) {
      res.status(404).send({
        message: "The genre with the ID was not found, try with different ID",
      });
    }
    res.status(200).send({ message: "Deleted Successfully", genre });
  })
);
module.exports = router;
