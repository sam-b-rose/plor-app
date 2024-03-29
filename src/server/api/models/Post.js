import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  scheduled: {
    type: Date
  },
  draft: {
    type: Boolean,
    default: true
  },
  sent: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: 'Your post must have text!'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  connections: [{ type: mongoose.Schema.ObjectId, ref: 'Connection' }]
});

function autopopulate(next) {
  this.populate('connections');
  this.populate('author');
  next();
}

postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);
postSchema.pre('findOneAndUpdate', autopopulate);

export default mongoose.model('Post', postSchema);
