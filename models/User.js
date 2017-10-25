const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
  gender: String,
  placesLived: [{ value: String, primary: { type: Boolean, default: false } }],
  following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }]
}, { timestamp: { createdAt: 'createdAt' } });

mongoose.model('user', userSchema);
