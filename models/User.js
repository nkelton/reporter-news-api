const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteReporters: {
    type: [String],
    default: [],
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
