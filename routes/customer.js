const express = require("express");
const router = express.Router();
const validateCustomer = require("../validations/customerValidation");
const Customer = require("../models/customer");
const auth = require("../middleware/auth");
const asyncHandler = require("../middleware/async");
const dbFuntions = require("../helpers/dbFunctions");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // const customers = await Customer.find().sort("name");
    const customers = await dbFuntions.findAll("Customer");
    res.status(200).send(customers);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // const customer = await Customer.findById(req.params.id);
    const customer = await dbFuntions.findById("Customer", req.params.id);
    if (!customer) {
      res.status(404).send({
        message:
          "The customer with the ID was not found, try with different ID",
      });
    }
    res.status(200).send(customer);
  })
);

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    let customer = await dbFuntions.createOne("Customer", {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });
    res.status(201).send({ message: "added successfully", customer });
  })
);

router.put(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const customer = await dbFuntions.findByIdAndUpdate(
      "Customer",
      req.params.id,
      req.body
    );
    if (!customer) {
      res.status(404).send({
        message:
          "The customer with the ID was not found, try with different ID",
      });
    }
    res.status(200).send({ message: "Updated Successfully", customer });
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const customer = await Customer.deleteOne("Customer", req.params.id);
    if (!customer) {
      res.status(404).send({
        message:
          "The customer with the ID was not found, try with different ID",
      });
    }
    res.status(200).send({ message: "Deleted Successfully", customer });
  })
);
module.exports = router;
