import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  text: {
    type: String,
    required: 'Your post must have text!'
  }
});

function autopopulate(next) {
  this.populate('author');
  next();
}

postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);

export default mongoose.model('Post', postSchema);
