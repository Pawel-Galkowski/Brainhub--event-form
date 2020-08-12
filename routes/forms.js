const express = require("express");
const router = express.Router();
const standardMailer = require("../middleware/EventFormMailer");
const Event = require("../models/Events");

// @route   Post forms/eventForm
// @desc    Post standard form
// @access  Private

router.post("/eventForm", async (req, res) => {
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
});

module.exports = router;
