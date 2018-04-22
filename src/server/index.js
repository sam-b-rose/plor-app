import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
});

// setup the database connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useMongoClient: true });

// Start our app!
app.listen(process.env.PORT, process.env.HOST, err => {
  if (err) {
    console.log(err);
  }
  console.log(
    `Server listening on http://${process.env.HOST}:${process.env.PORT}`
  );
});
