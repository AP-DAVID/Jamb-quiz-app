const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);