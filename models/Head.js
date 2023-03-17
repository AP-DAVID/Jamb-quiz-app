const mongoose = require("mongoose");
const Subject = require("../models/Subject");

const HeadSchema = new mongoose.Schema({
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      ref: Subject,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Head", HeadSchema);
