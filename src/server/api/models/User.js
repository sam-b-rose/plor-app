import mongoose from 'mongoose';
import md5 from 'md5';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import passportLocalMongoose from 'passport-local-mongoose';
import { PassportLocalSchema } from 'mongoose';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [
        {
          validator: value => validator.isEmail(value),
          msg: 'Invalid Email Address'
        }
      ],
      required: 'Please Supply an email address'
    },
    name: {
      type: String,
      required: 'Please supply a name',
      trim: true
    },
    connections: {
      type: [{ type: mongoose.Schema.ObjectId, ref: 'Connection' }],
      default: []
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  populateFields: ['connections']
});
userSchema.plugin(mongodbErrorHandler);

export default mongoose.model('User', userSchema);
