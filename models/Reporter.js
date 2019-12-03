const mongoose = require("mongoose");

const ReporterSchema = mongoose.Schema({
  name: {
    type: String,
    unqiue: true,
    required: true
  },
  description: {
    type: String
  },
  searchCount: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("Reporter", ReporterSchema);
