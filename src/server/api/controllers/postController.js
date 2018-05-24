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
    const posts = await Post.find({ author });
    res.json({ message: `Posts by ${req.user.email}`, posts });
  },
  async getScheduled(req, res) {
    const posts = await Post.find({ sent: false }).select('_id');
    res.json({ message: 'Posts ready to be sent', posts });
  },
  async sendPost(req, res) {
    const post = await Post.findById(req.query.id);
    const { twitterBaseUrl } = twitter;
    const { accessToken, accessTokenSecret } = post.connections[0].oauth;
    const postBody = {
      status: post.text
    };
    let { data } = await oauthPost(
      `${twitterBaseUrl}statuses/update.json`,
      accessToken,
      accessTokenSecret,
      postBody
    );
    res.json({
      message: 'Post successfully sent ',
      id: req.query.id,
      data: JSON.parse(data)
    });
  },
  async addPost(req, res) {
    req.body.author = req.user._id;
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.json({ message: 'Post Saved!', post });
  }
};
