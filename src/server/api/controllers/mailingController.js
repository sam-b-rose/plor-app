import Airtable from 'airtable';

const isProd = process.env.NODE_ENV === 'production';

// Plor Airtable info
const apiKey = process.env.AIRTABLE_API_KEY;
const table = new Airtable({ apiKey }).base('appkERkCkubAZ3eYf');

export default {
  async get(req, res) {
    res.json({ message: 'Hey, we have a mailing list.' });
  },
  async post(req, res) {
    // Add to mailing list
    table('Contacts').create(
      {
        Name: req.body.name,
        Email: req.body.email,
        Title: req.body.title,
        Organization: req.body.org
      },
      (err, record) => {
        if (err) return console.error(err);
        const recordId = record.getId();
        res.json({ message: 'Added to mailing list!', recordId });
      }
    );
  }
};
