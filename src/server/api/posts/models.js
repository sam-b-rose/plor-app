import mongoose from 'mongoose';
// import { ServerError } from 'express-server-error'

const postSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    email: {
      type: String,
      require: true
    }
    // connections: {
    //   type: [mongoose.Schema.ObjectId],
    //   ref: 'Connection',
    //   required: 'You must supply a Connection'
    // }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model('Post', postSchema);
