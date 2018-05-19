import Post from '../models/Post';

export default {
  async getPosts(req, res) {
    const author = req.user._id;
    const posts = await Post.find({ author });
    res.json({ message: `Posts by ${req.user.email}`, posts });
  },
  async addPost(req, res) {
    req.body.author = req.user._id;
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.json({ message: 'Post Saved!', post });
  }
};
