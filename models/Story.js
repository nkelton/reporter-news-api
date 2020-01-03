const mongoose = require("mongoose");

const StorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  link: {
    type: String,
    unqiue: true,
    required: true
  },
  published: {
    type: Date,
    default: Date.now,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  reporterName: {
    type: String,
    required: true
  },
  reporterDescription: {
    type: String
  }
});

module.exports = mongoose.model("Story", StorySchema);
