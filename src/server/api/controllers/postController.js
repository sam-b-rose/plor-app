import Post from '../models/Post';

import { twitter } from '../service/twitter';

const oauthGet = (url, oauthAccessToken, oauthAccessTokenSecret) => {
  return new Promise((resolve, reject) =>
    twitter.oauth.get(
      url,
      oauthAccessToken,
      oauthAccessTokenSecret,
      (error, data, result) => {
        if (error) return reject(error);
        resolve({ data, result });
      }
    )
  );
};

const oauthPost = (url, oauthAccessToken, oauthAccessTokenSecret, postBody) => {
  return new Promise((resolve, reject) =>
    twitter.oauth.post(
      url,
      oauthAccessToken,
      oauthAccessTokenSecret,
      postBody,
      (error, data, result) => {
        if (error) return reject(error);
        resolve({ data, result });
      }
    )
  );
};

export default {
  async getPosts(req, res) {
    const author = req.user._id;
    const posts = await Post.find({ author, sent: false, draft: false });
    res.json({ message: `Posts by ${req.user.email}`, posts });
  },
  async getDrafts(req, res) {
    const author = req.user._id;
    const posts = await Post.find({ author, sent: false, draft: true });
    res.json({ message: `Drafts by ${req.user.email}`, posts });
  },
  async getHistory(req, res) {
    const author = req.user._id;
    const posts = await Post.find({ author, sent: true });
    res.json({ message: `History of posts by ${req.user.email}`, posts });
  },
  async getScheduled(req, res) {
    // Get posts that haven't been sent
    // and are due or past due to be sent
    const posts = await Post.find({
      sent: false,
      scheduled: { $lte: Date.now() }
    }).select('_id');
    res.json({ message: 'Posts ready to be sent', posts });
  },
  async sendPost(req, res) {
    const post = await Post.findById(req.query.id);
    const { twitterBaseUrl } = twitter;
    // TODO: Get multiple oauth connections
    const { accessToken, accessTokenSecret } = post.connections[0].oauth;
    const postBody = {
      status: post.text
    };
    // Send the post
    // TODO: Only working for twitter right now
    let { data } = await oauthPost(
      `${twitterBaseUrl}statuses/update.json`,
      accessToken,
      accessTokenSecret,
      postBody
    );
    // Mark post as sent
    post.sent = true;
    post.scheduled = new Date();
    const updatedPost = await post.save();
    // Return success message
    res.json({
      message: 'Post successfully sent ',
      id: req.query.id,
      post: updatedPost,
      data: JSON.parse(data)
    });
  },
  async addPost(req, res) {
    req.body.author = req.user._id;
    const newPost = new Post(req.body);
    const { _id } = await newPost.save();
    const post = await Post.findOne({ _id });
    res.json({ message: 'Post Saved!', post });
  },
  async updatePost(req, res) {
    const updates = {
      updated: req.body.updated || new Date(),
      scheduled: req.body.scheduled,
      draft: req.body.draft,
      text: req.body.text,
      connections: req.body.connections,
      author: req.user._id
    };
    const post = await Post.findOneAndUpdate(
      { _id: req.body._id },
      { $set: updates },
      { new: true, runValidators: true, context: 'query' }
    );
    res.json({ message: 'Updated post 👍', post });
  },
  async deletePost(req, res) {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.json({ message: 'Deleted post 💣', post });
  }
};
