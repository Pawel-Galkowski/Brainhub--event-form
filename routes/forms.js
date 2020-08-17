const express = require("express");
const router = express.Router();
const standardMailer = require("../middleware/EventFormMailer");
const Event = require("../models/Events");
const { check, validationResult } = require("express-validator");

// @route   Post forms/eventForm
// @desc    Post standard form
// @access  Private

router.post(
  "/eventForm",
  [
    check("name", "Name is required").not().isEmpty(),
    check("surname", "Surname is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check Validation
    if (!errors.isEmpty()) {
      // Return any errors with 400 status
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, formName, date } = req.body;

    const register = new Event({
      name: name,
      surname: surname,
      email: email,
      eventName: formName,
      date: date,
    });
    try {
      const resEmail = standardMailer(req.body);
      await resEmail.then((value) => {
        return value;
      });
      await register.save();
      return res.json("Registration confirmed");
    } catch (err) {
      return res.status(400).json("Invalid  data");
    }
  }
);

// @route   GET forms/persons
// @desc    Get random person
// @access  Private

router.get("/persons", async (req, res) => {
  try {
    const person = await Event.aggregate([{ $sample: { size: 1 } }]);

    if (!person) return res.status(400).json("No persons registered");

    res.json(person);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});


// @route   DELETE forms/removePerson
// @desc    Remove person by email
// @access  Private

router.delete("/removePerson", async (req, res) => {
  try {
    await Event.findOneAndRemove({ email: req.body.email });
    res.json("Person removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
