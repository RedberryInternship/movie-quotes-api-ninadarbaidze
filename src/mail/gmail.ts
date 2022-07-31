import nodemailer from 'nodemailer'

export const sendConfirmationEmail = async (username: string, email: string, token: string ) => {

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'moviequote.redberry@gmail.com',
      pass: 'gdbaqxivxmlrgytq'
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  
  let mailOptions = {
    from: 'Movie Quotes',
    to: email,
    subject: `Confirm your account ${username}`,
    text: 'test email from nina'
  }
  
  transporter.sendMail(mailOptions, (err, success) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Email sent successfully')
      console.log(success)
    }
  })
}

