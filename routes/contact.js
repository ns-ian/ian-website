var express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer')

router.get('/', function (req, res, next) {
  res.render('contact/index', { title: 'contact' })
})

router.post('/', function (req, res, next) {
  let smtpTransport = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  let mailData = {
    from: 'no-reply@ian-wright.me',
    to: 'contact@ian-wright.me',
    subject: 'Message from contact form at ian-wright.me',
    text: `${req.body.name} (${req.body.email}) says:\n\n${req.body.message}`
  }
  smtpTransport.sendMail(mailData, function (error, response) {
    if (error) {
      console.log(error)
      res.render('contact/contact-error', { title: 'message sent!' })
    } else {
      res.render('contact/contact-success', { title: 'error' })
    }
  })
})

module.exports = router
