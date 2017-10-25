const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema(
  {
    description: String,
    image: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }]
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

mongoose.model('post', postSchema);
