import Post from '../models/Post';

export default {
  async addPost(req, res) {
    req.body.author = req.user._id;
    const newPost = new Post(req.body);
    await newPost.save();
    req.json({ message: 'Post Saved!' });
  }
};
