import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    accessToken: {
      type: String,
      required: true
    },
    accessTokenSecret: {
      type: String,
      required: true
    },
    verifier: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model('Connection', connectionSchema);
