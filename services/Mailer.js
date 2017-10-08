const sendgrid = require('sendgrid')

// typically defined as 'const helper = sendgrid.mail',
// or 'const { mail: helper } = sendgrid',
// nested destructure chosen for better readability
const {
  mail: {
    Mail,
    Email,
    Content,
    TrackingSettings,
    ClickTracking,
    Personalization,
  },
} = sendgrid

class Mailer extends Mail {
  constructor({ subject, recipients }, content) {
    super()

    this.sendGridApi = sendgrid(process.env.SENDGRID_KEY)
    this.from_email = new Email('no-reply@homingbird.com')
    this.subject = subject
    this.body = new Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  // eslint-disable-next-line class-methods-use-this
  formatAddresses(recipients) {
    return recipients.map(({ email }) => new Email(email))
  }

  addClickTracking() {
    const trackingSettings = new TrackingSettings()
    const clickTracking = new ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new Personalization()

    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient)
    })

    this.addPersonalization(personalize)
  }

  async send() {
    const request = this.sendGridApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    })

    const response = await this.sendGridApi.API(request)
    return response
  }
}

module.exports = Mailer
