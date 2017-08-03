const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
})

mongoose.model('users', userSchema);
