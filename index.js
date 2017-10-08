require('dotenv').config({ path: './config/.env' })
require('./models/User')
require('./models/Survey')
require('./services/passport')

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true,
})

const app = express()

app.use(bodyParser.json())
app.use(cookieSession({
  // 30 days in milliseconds
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/auth-routes')(app)
require('./routes/billing-routes')(app)
require('./routes/survey-routes')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => (
  /* eslint-disable no-console */
  console.log(`Listening on localhost:${PORT} \n`)
))
