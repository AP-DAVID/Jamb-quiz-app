const mongoose = require("mongoose");
// const Question = require("../models/Question");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Question",
    },
  ],
});



module.exports = mongoose.model("Subject", SubjectSchema);
