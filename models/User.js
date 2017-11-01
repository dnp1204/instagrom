const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    googleId: String,
    facebookId: String,
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    avatar: String,
    gender: String,
    placesLived: [
      { value: String, primary: { type: Boolean, default: false } }
    ],
    following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }]
  },
  {
    timestamp: { createdAt: 'createdAt' },
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

mongoose.model('user', userSchema);
