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

// @route   Post forms/newRegister
// @desc    Post new person to database
// @access  Private

// router.post("/newRegister", async (req, res) => {
//   const { name, surname, email, date } = req.body;

//   const register = new Person({
//     name: name,
//     surname: surname,
//     email: email,
//     date: date,
//   });

//   try {
//     // let checkRegister = await Person.findOne({ email });
//     // if (Object.entries(register) === Object.entries(checkRegister)) {
//     //   return res
//     //     .status(400)
//     //     .json({ errors: [{ msg: "User already registered" }] });
//     // }

//     await register.save();
//     return res.json({ msg: "User saved" });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ errors: { msg: "server error" } });
//   }
// });

module.exports = router;
