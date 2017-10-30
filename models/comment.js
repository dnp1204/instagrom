const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    content: { type: String, required: true }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

mongoose.model('comment', commentSchema);
