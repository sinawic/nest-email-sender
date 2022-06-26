import { SupporterEmailsModels } from '../supporterEmails/supporterEmails.models'
const nodemailer = require('nodemailer')

interface IMailOptions {
  to: string,
  from: string | undefined,
  subject: string,
  text: string,
  attachments?: { path: any; }[]
}

const sendMail = (options: IMailOptions) => {
  // options.from || 
  console.log('sending from:', options.from, 'sending to:', options.to)

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: options.from,
      pass: process.env.SOURCE_PASSWORD
    }
  })

  var mailOptions: IMailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    attachments: []
  }

  if (options.attachments) {
    options.attachments.map(a => {
      mailOptions.attachments?.push({ path: a.path })
    })
  }

  // add attachments if any
  if (options.attachments && options.attachments.length > 0) {
    mailOptions.attachments = options.attachments.map(attachment => ({ path: attachment.path }))
  }

  return transporter.sendMail(mailOptions, function (error: any, info) {
    if (error) {
      throw new Error(error)
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}


// a service which listens to database changes
// if detects any email with {sent=false}, it will send an email
// this is done for simulating queueing
// so that the data doesn't get lost in high scales
export class MailsService {
  constructor(private emailsModels: SupporterEmailsModels) { }

  init = async () => {
    const i = process.env.INTERVAL || 5000
    console.log(`Mail Service is running every ${+i / 1000} seconds...`)

    setInterval(async () => {

      const email = await this.emailsModels.Email.aggregate([
        //@ts-ignore
        { $match: { sent: false } },
        { $sort: { 'date_created': 1 } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'attachments',
            localField: '_id',
            foreignField: 'email',
            as: 'attachments'
          }
        },
        {
          $lookup: {
            from: 'rooms',
            localField: 'room',
            foreignField: '_id',
            as: 'room'
          }
        }, { $unwind: '$room' }
      ])

      if (email.length > 0) {
        const { to, subject, text, attachments, room } = email[0]
        try {
          await sendMail({ to, subject, text, attachments, from: room.email })
          await this.emailsModels.Email.updateOne({ _id: email[0]._id }, { sent: true })
        } catch (err) {
          console.log(err)
        }
      } else
        console.log('No emails to send')


    }, +i)

  }
}