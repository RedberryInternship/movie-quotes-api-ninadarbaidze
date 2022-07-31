import nodemailer from 'nodemailer'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'

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

  const handlebarOptions: any = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.join(`${process.cwd()}/src/views`),
      defaultLayout: false,
    },
    viewPath: path.join(`${process.cwd()}/src/views`),
    extName: ".handlebars",
  }


  transporter.use('compile', hbs(handlebarOptions));
  
  let mailOptions = {
    from: 'Movie Quotes',
    to: email,
    subject: `Confirm your account ${username}`,
    template: 'email',  
    context: {
      title: 'Title Here',
      text: "Lorem ipsum dolor sit amet, consectetur..."
    }
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

