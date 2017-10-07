const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const requireLogin = require('../middlewares/require-login')

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    })

    req.user.credits += 5
    const user = await req.user.save()

    return res.send(user)
  })
}

// var stripe = require("stripe")(
//   "sk_test_97tnpt9gYZqwVccyNzJZiZo6"
// );
//
// stripe.charges.create({
//   amount: 2000,
//   currency: "usd",
//   source: "tok_amex", // obtained with Stripe.js
//   description: "Charge for aubrey.taylor@example.com"
// }, function(err, charge) {
//   // asynchronously called
// });
