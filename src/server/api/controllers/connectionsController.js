import Connection from '../models/Connection';

export default {
  async get(req, res) {
    const user = req.user._id;
    const connections = await Connection.find({ user });
    res.json({ message: `Connections for ${user}`, connections });
  },
  async addConnections(req, res) {
    req.body.user = req.user._id;
    const newConnection = new Connection(req.body);
    const connection = await newConnection.save();
    res.json({ message: 'Connections Saved!', connection });
  }
};
