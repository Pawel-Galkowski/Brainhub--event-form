const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Events = mongoose.model("events", EventsSchema);

module.exports = Events;
