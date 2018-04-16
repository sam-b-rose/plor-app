import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connect from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import expressValidator from 'express-validator';
import apiRoutes from './api/routes';

import { Nuxt, Builder } from 'nuxt';
import config from '../../nuxt.config';

import './handlers/passport';

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// Create session store
const MongoStore = connect(session);

app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// Import API Routes
app.use('/api', apiRoutes);

config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

export default app;
