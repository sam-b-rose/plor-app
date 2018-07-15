import Post from '../models/Post'

import { twitter } from '../service/twitter'

const oauthGet = (url, oauthAccessToken, oauthAccessTokenSecret) => {
  return new Promise((resolve, reject) =>
    twitter.oauth.get(
      url,
      oauthAccessToken,
      oauthAccessTokenSecret,
      (error, data, result) => {
        if (error) return reject(error)
        resolve({ data, result })
      }
    )
  )
}

const oauthPost = (url, oauthAccessToken, oauthAccessTokenSecret, postBody) => {
  return new Promise((resolve, reject) =>
    twitter.oauth.post(
      url,
      oauthAccessToken,
      oauthAccessTokenSecret,
      postBody,
      (error, data, result) => {
        if (error) return reject(error)
        resolve({ data, result })
      }
    )
  )
}

export default {
  async getPosts(req, res) {
    const author = req.user._id
    const posts = await Post.find({ author })
    res.json({ message: `Posts by ${req.user.email}`, posts })
  },
  async getScheduled(req, res) {
    // Get posts that haven't been sent
    // and are due or past due to be sent
    const posts = await Post.find({
      sent: false,
      scheduled: { $lte: Date.now() }
    }).select('_id')
    res.json({ message: 'Posts ready to be sent', posts })
  },
  async sendPost(req, res) {
    const post = await Post.findById(req.query.id)
    const { twitterBaseUrl } = twitter
    // TODO: Get multiple oauth connections
    const { accessToken, accessTokenSecret } = post.connections[0].oauth
    const postBody = {
      status: post.text
    }
    // Send the post
    // TODO: Only working for twitter right now
    let { data } = await oauthPost(
      `${twitterBaseUrl}statuses/update.json`,
      accessToken,
      accessTokenSecret,
      postBody
    )
    // Mark post as sent
    post.sent = true
    await post.save()
    // Return success message
    res.json({
      message: 'Post successfully sent ',
      id: req.query.id,
      data: JSON.parse(data)
    })
  },
  async addPost(req, res) {
    req.body.author = req.user._id
    const newPost = new Post(req.body)
    const post = await newPost.save()
    res.json({ message: 'Post Saved!', post })
  }
}
