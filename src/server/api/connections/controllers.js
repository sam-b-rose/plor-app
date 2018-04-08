import Connection from './models'
import { ServerError } from 'express-server-error'

export const index = {
  async get (req, res) {
    try {
      let connections = await Connection.find({})
      if (!connections) throw new ServerError('You have no connections at this moment.', { status: 404 })
      res.json(connections)
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    try {
      const { type, username, accessToken, accessTokenSecret, verifier } = req.body
      let connection = await (new Connection({ type, username, accessToken, accessTokenSecret, verifier })).save()
      res.json({ message: `Your Connection has been made! - ${connection.type}!`, connection })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const username = {
  async get (req, res) {
    try {
      let posts = await Connection.find({ username: req.params.username })
      if (!posts) throw new ServerError(`No connections belonging to '${req.params.username}'.`, { status: 404 })
      res.json(posts)
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const connectionid = {
  async get (req, res) {
    try {
      let fetchedPost = await Connection.findOne({ _id: req.params.postid })
      if (!fetchedPost) throw new ServerError(`Connection with id '${req.params.postid}' doesn't exist.`, { status: 404 })
      res.json({
        message: fetchedPost.message,
        username: fetchedPost.username
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
      if (req.user.username === req.params.username) {
        let deleted = await Connection.findOneAndRemove({ _id: req.params.postid })
        if (!deleted) throw new ServerError(`Connection with id '${req.params.postid}' doesn't exist.`, { status: 404 })
        res.json({ message: 'Successfully deleted post.' })
      } else {
        throw new ServerError('Unauthorized.', { status: 401 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
