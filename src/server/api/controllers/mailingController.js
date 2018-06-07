export default {
  async get(req, res) {
    res.json({ message: 'Hey, we have a mailing list.' });
  },
  async post(req, res) {
    const member = {
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      org: req.body.org
    };
    // Add to mailing list
    res.json({ message: 'Added to mailing list!', member });
  }
};
