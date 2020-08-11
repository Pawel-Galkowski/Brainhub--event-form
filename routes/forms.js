const express = require("express");
const router = express.Router();
const standardMailer = require("../middleware/EventFormMailer");
const Person = require("../models/Persons");

// @route   Post forms/eventForm
// @desc    Post standard form
// @access  Private

router.post("/eventForm", async (req, res) => {
  try {
    const resEmail = standardMailer(req.body);
    await resEmail.then((value) => {
      return value;
    });
    return res.json( req.body );
    //return res.json({ msg: "Message send"});
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "Invalid  data" }] });
  }
});

// @route   Post forms/newRegister
// @desc    Post new person to database
// @access  Private

router.post("/newRegister", async (req, res) => {
  const { name, surname, email, date } = req.body;
  const register = new Person({
    name,
    surname,
    email,
    date,
  });
  try {
    let checkRegister = await Person.findOne({email});
    if(_.isEqual(register, checkRegister)){
      return res.status(400).json({ errors: [{ msg: "User already registered" }] });
    }
    await register.save();
    return res.json({ msg: "User saved"});
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: err }] });
  }
});

module.exports = router;
