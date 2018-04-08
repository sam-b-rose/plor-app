import bcrypt from 'bcryptjs'
import blacklist from 'express-jwt-blacklist'
import User from './models'
import jwt from 'jsonwebtoken'
import stripUser from '~/util/stripUser'
import randId from '~/util/randId'
import { ServerError } from 'express-server-error'

export const index = {
  async get (req, res) {
    try {
      let users = await User.find({})
      if (!users) throw new ServerError('No users exist at this moment.', { status: 404 })
      res.json(users)
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    try {
      let { email, fullName, password1, password2 } = req.body
      if (password1 === password2) {
        let password = await bcrypt.hash(password1, 10)
        let newUser = new User({ email, fullName, password })
        let savedUser = await newUser.save()
        // Login the new user
        savedUser = stripUser(savedUser)
        let token = jwt.sign(savedUser, process.env.SECRET, { expiresIn: '30 days', jwtid: randId() })
        res.status(200).json({ message: `Welcome, ${savedUser.fullName}!`, token, savedUser })
      } else {
        throw new ServerError('Passwords don\'t match.', { status: 400 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const check = {
  async get (req, res) {
    try {
      let authorizedQueries = ['email']
      if (authorizedQueries.includes(req.query.check)) {
        let check = req.query.check
        let data = req.query.data
        let user = await User.find({ [check]: data })
        if (user.length) res.json({ exists: true })
        else res.json({ exists: false })
      } else {
        throw new ServerError('Query not supported.', { status: 400 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const email = {
  async get (req, res) {
    try {
      // check if the logged in user has the same username as the requested user.
      if (req.user.email === req.params.email) {
        res.json(req.user)
      } else {
        let fetchedUser = await User.findOne({ email: req.params.email })
        if (!fetchedUser) throw new ServerError(`User with username '${req.params.username}' doesn't exist.`, { status: 404 })
        res.json({
          email: fetchedUser.email,
          message: `Authentication by ${req.params.fetchedUser.email} required to view more...`
        })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    res.json({ message: 'Update the user, and return the updated user.' })
  },
  async delete (req, res) {
    try {
      if (req.user.email === req.params.email) {
        let deleted = await User.findOneAndRemove({ email: req.user.email })
        if (!deleted) throw new ServerError(`User with email '${req.params.email}' doesn't exist.`, { status: 404 })
        res.json({ message: 'Successfully deleted user.' })
      } else {
        throw new ServerError('Unauthorized.', { status: 401 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

// separate into auth app if need be. 'sign-up' is handled as a POST request to '/users'
export const signIn = {
  async post (req, res) {
    try {
      let { email, password } = req.body
      let user = await User.findOne({ email })
      if (!user) throw new ServerError('Authentication failed. Incorrect email or password', { status: 401, log: false })
      let passwordHash = user.password
      let matched = await bcrypt.compare(password, passwordHash)
      if (!user || !matched || !email || !password) {
        throw new ServerError('Authentication failed. Incorrect email or password', { status: 401, log: false })
      } else {
        user = stripUser(user)
        let token = jwt.sign(user, process.env.SECRET, { expiresIn: '30 days', jwtid: randId() })
        res.status(200).json({ message: `Welcome, ${user.fullName}!`, token, user })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const signOut = {
  async post (req, res) {
    try {
      blacklist.revoke(req.user)
      res.json({ message: 'Sign out successful. Good bye! :)' })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
