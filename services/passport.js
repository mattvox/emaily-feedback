const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = mongoose.model('users')

const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  proxy: true,
}

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

passport.use(new GoogleStrategy(
  strategyOptions,
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })

    if (existingUser) {
      return done(null, existingUser)
    }

    const user = await new User({ googleId: profile.id }).save()
    return done(null, user)
  },
))

// old promise code

// passport.use(new GoogleStrategy(strategyOptions, (accessToken, refreshToken, profile, done) => {
//   User.findOne({ googleId: profile.id })
//     .then((existingUser) => {
//       if (existingUser) {
//         done(null, existingUser)
//       } else {
//         new User({ googleId: profile.id })
//           .save()
//           .then(user => done(null, user))
//       }
//     })
// }))
