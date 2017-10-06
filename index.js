require('dotenv').config({ path: './config/.env' })
require('./models/User')
require('./services/passport')

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')


mongoose.connect(process.env.MONGO_URI)

const app = express()

app.use(cookieSession({
  // 30 days in milliseconds
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}))

app.use(passport.initialize())
app.use(passport.session())

require('./routes/auth-routes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => (
  /* eslint-disable no-console */
  console.log(`Listening on localhost:${PORT}`)
))
