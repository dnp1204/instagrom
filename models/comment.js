const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }]
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

mongoose.model('comment', commentSchema);
