import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
// import cors from 'cors'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import { Nuxt, Builder } from 'nuxt'

import config from '../../nuxt.config'
import apiRoutes from './api'

const app = express()

// Global middleware
// only allow http://127.0.0.1:3000 and http://localhost:3000
// only allow process.env.API_URL, process.env.SERVER_API_URL, and process.env.PAGE_URL
// app.use(cors({
//   origin: process.env.NOW_URL // fix this.
// }))
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cookieParser())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Import API Routes
app.use('/api', apiRoutes)

config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// setup the database connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, { useMongoClient: true })

app.listen(process.env.PORT, process.env.HOST, err => {
  if (err) { console.log(err) }
  console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`)
})

export default app
