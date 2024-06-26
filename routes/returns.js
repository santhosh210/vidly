const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const validateReturn = require("../validations/returnValidation");
const validate = require("../middleware/validate");
const asyncHandler = require("../middleware/async");
const dbFuntions = require("../helpers/dbFunctions");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // const returns = await Return.find().sort("name");
    const returns = await dbFuntions.findAll("Rental");
    res.status(200).send(returns);
  })
);

router.post(
  "/",
  validate(validateReturn),
  asyncHandler(async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
    if (!rental) {
      return res.status(404).send("No such rental found");
    }

    rental.return();
    await rental.save();
    res.status(401).send("unauthorized token");
  })
);

module.exports = router;
