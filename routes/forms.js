const express = require("express");
const router = express.Router();
const standardMailer = require("../middleware/EventFormMailer");
const Event = require("../models/Events");
const { check, validationResult } = require("express-validator/check");

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
      return res.json({ msg: "Registration confirmed" });
    } catch (err) {
      return res.status(400).json({ errors: [{ msg: "Invalid  data" }] });
    }
  }
);

module.exports = router;
