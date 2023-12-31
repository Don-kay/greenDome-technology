const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      minlength: 5,
      maxlength: 1000,
      trim: true,
    },
    image: {
      type: String,
    },
    option1: {
      type: String,
      minlength: 1,
      maxlength: 200,
      trim: true,
      required: [true, "please provide answer"],
    },
    option2: {
      type: String,
      minlength: 1,
      maxlength: 200,
      trim: true,
      required: [true, "please provide answer"],
    },
    option3: {
      type: String,
      minlength: 1,
      maxlength: 200,
      trim: true,
      required: [true, "please provide answer"],
    },
    option4: {
      type: String,
      minlength: 1,
      maxlength: 200,
      trim: true,
      required: [true, "please provide answer"],
    },
    answer: {
      type: String,
      minlength: 1,
      maxlength: 200,
      trim: true,
      required: [true, "please provide correct answer"],
    },
    moduleName: {
      type: String,
      ref: "course",
    },
    moduleId: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      required: [true, "please provide course"],
    },
    className: {
      type: String,
      ref: "class",
    },
    classId: {
      type: mongoose.Types.ObjectId,
      ref: "class",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
