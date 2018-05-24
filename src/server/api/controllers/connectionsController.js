import Connection from '../models/Connection';

export default {
  async get(req, res) {
    const user = req.user._id;
    const connections = await Connection.find({ user });
    res.json({ message: `Connections for ${user}`, connections });
  },
  async addConnection(req, res) {
    req.body.user = req.user._id;
    // Add Connection
    const newConnection = new Connection(req.body);
    const connection = await newConnection.save();

    // Add Connection to User
    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { connections: connection }
    });
    res.json({ message: 'Connections Saved!', connection });
  }
};
