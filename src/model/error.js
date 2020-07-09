const mongoose = require("../database");

const ErrorSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
});

const Error = mongoose.model("Error", ErrorSchema);

module.exports = Error;