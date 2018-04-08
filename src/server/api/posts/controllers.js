import Post from './models'
// import randId from '~/util/randId'
import { ServerError } from 'express-server-error'

export const index = {
  async get (req, res) {
    try {
      let posts = await Post.find({})
      if (!posts) throw new ServerError('No posts exist at this moment.', { status: 404 })
      res.json(posts)
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    try {
      // const uid = randId()
      // console.log(uid)
      const { message, email } = req.body
      let post = await (new Post({ message, email })).save()
      res.json({ message: `Your Post is on deck! - ${post.message}!`, post })
    } catch (error) {
      console.log(error)
      res.handleServerError(error)
    }
  }
}

export const email = {
  async get (req, res) {
    try {
      let posts = await Post.find({ email: req.params.email })
      if (!posts) throw new ServerError(`No posts belonging to '${req.params.email}'.`, { status: 404 })
      res.json(posts)
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const postid = {
  async get (req, res) {
    try {
      let fetchedPost = await Post.findOne({ _id: req.params.postid })
      if (!fetchedPost) throw new ServerError(`Post with id '${req.params.postid}' doesn't exist.`, { status: 404 })
      res.json({
        message: fetchedPost.message,
        email: fetchedPost.email
      })
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    res.json({ message: 'Update the post, and return the updated post.' })
  },
  async delete (req, res) {
    try {
      if (req.user.email === req.params.email) {
        let deleted = await Post.findOneAndRemove({ _id: req.params.postid })
        if (!deleted) throw new ServerError(`Post with id '${req.params.postid}' doesn't exist.`, { status: 404 })
        res.json({ message: 'Successfully deleted post.' })
      } else {
        throw new ServerError('Unauthorized.', { status: 401 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
