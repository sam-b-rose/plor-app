require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
});
const MongoClient = require('mongodb').MongoClient;
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

async function createAdmin(email = 'admin@email.com') {
  try {
    let db = await MongoClient.connect(process.env.DB_URL);
    let rand = uuidv4()
      .split('-')
      .join('');
    let password = await bcrypt.hash(this.password, 10);
    await db.collection('users').insertOne({ email, password, admin: true });
    console.log(`
      email: ${email}
      password: ${rand}
      Please sign in and create a new super user immediately. Delete this user when done.
    `);
    await db.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

createAdmin();
