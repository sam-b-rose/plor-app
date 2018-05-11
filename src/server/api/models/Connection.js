import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connectionSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user!'
  },
  type: {
    type: String,
    required: 'Your connection must have a type.'
  },
  account: {
    type: Object,
    required: 'Your connection must have an account.'
  },
  oauth: {
    type: Object,
    required: 'Your connection must have oauth info.'
  }
});

function autopopulate(next) {
  this.populate('user');
  next();
}

connectionSchema.pre('find', autopopulate);
connectionSchema.pre('findOne', autopopulate);

export default mongoose.model('Connection', connectionSchema);
