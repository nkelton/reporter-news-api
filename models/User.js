const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
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
  reporters: {
    type: [
      {
        name: {
          type: String,
          unique: true,
          require: true
        },
        description: {
          type: String
        }
      }
    ],
    default: [],
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
