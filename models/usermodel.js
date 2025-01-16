const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  }
);


const User = mongoose.models.User || mongoose.model('User', userSchema); // if user exist  the first one work

module.exports = User;
