import passport from 'passport';
import crypto from 'crypto';

import User from '../models/User';
import mail from '../../handlers/mail';
import { ServerError } from 'express-server-error';

export default {
  async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) throw new ServerError('Failed to find user.');
      req.logIn(user, err => {
        if (err) return next(err);
        res.json({ message: `Welcome, ${user.name}!`, user });
      });
    })(req, res, next);
  },

  async logout(req, res) {
    req.logout();
    req.json({ message: 'You are now logged out! 👋' });
  },

  async isLoggedIn(req, res, next) {
    // first check if the user is authenticated
    if (req.isAuthenticated()) {
      next(); // carry on! They are logged in!
      return;
    }
    throw new ServerError('Oops you must be logged in to do that!', {
      status: 401,
      log: false
    });
  },

  async forgot(req, res) {
    // 1. See if a user with that email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      throw new ServerError('No account with that email exists.', {
        status: 404
      });

    // 2. Set reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // 3. Send them an email with the token
    const resetURL = `http://${req.headers.host}/users/account/reset/${
      user.resetPasswordToken
    }`;
    await mail.send({
      user,
      filename: 'password-reset',
      subject: 'Password Reset',
      resetURL
    });

    req.json({ message: 'You have been emailed a password reset link.' });
  },

  async reset(req, res) {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      throw new ServerError('Password reset is invalid or has expired', {
        status: 400
      });
    }
    // if there is a user, show the rest password form
    res.json({
      message: 'User exists and the reset token is valid'
    });
  },

  confirmedPasswords(req, res, next) {
    if (req.body.password === req.body.passwordConfirm) {
      next(); // keepit going!
      return;
    }
    throw new ServerError('Passwords do not match!', { status: 400 });
  },

  async update(req, res) {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user)
      throw new ServerError('Password reset is invalid or has expired', {
        status: 400
      });

    await user.setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    await req.login(updatedUser);
    res.json({
      message: '💃 Nice! Your password has been reset! You are now logged in!'
    });
  }
};
