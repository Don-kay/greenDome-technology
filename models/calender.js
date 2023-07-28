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
});

module.exports = mongoose.model("event", EventSchema);
