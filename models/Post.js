import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  body: {
    type: String,
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Post = model('post', PostSchema);

export default Post;