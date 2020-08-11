const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonsSchema = new Schema({
  persons: [
    {
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
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = Persons = mongoose.model("person", PersonsSchema);
