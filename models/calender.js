const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "please provide a description"],
  },
});

module.exports = mongoose.model("event", EventSchema);
