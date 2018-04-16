import { validationResult } from 'express-validator/check';
import { ServerError } from 'express-server-error';

import User from '../models/User';

export default {
  validateRegister(req, res, next) {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
      gmail_remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password Cannot be blank!').notEmpty();
    req
      .checkBody('passwordConfirm', 'Confirmed Password cannot be blank!')
      .notEmpty();
    req
      .checkBody('passwordConfirm', 'Oops! Your passwords do not match')
      .equals(req.body.password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    next(); // there were no errors!
  },

  async register(req, res, next) {
    const user = new User({ email: req.body.email, name: req.body.name });
    await User.register(user, req.body.password);
    next(); // pass to authController.login
  },

  account(req, res) {
    res.json({ user: req.user });
  },

  async updateAccount(req, res) {
    const updates = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: updates },
      { new: true, runValidators: true, context: 'query' }
    );
    res.json({ message: 'Updated the profile!', user });
  }
};
