import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveEmailDto, SaveFileDto } from './dto';
import { Email, Attachment } from './schemas';
const nodemailer = require('nodemailer')

interface IMailOptions {
  to: string,
  from: string | undefined,
  subject: string,
  text: string,
  attachments?: { path: any; }[]
}
@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<any>,
    @InjectModel(Attachment.name) private attachmentModel: Model<any>) {

    this.init()
  }

  createEmail = async (dto: SaveEmailDto) => {
    try {
      return await new this.emailModel({
        ...dto,
        date_created: new Date(),
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createAttachment = async (saveFileDto: SaveFileDto) => {
    try {
      return await new this.attachmentModel(saveFileDto).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }


  // a service which listens to database changes
  // if detects any email with {sent=false}, it will send an email
  // this is done for simulating queueing
  // so that the data doesn't get lost in high scales
  sendMail = (options: IMailOptions) => {
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

  init = async () => {
    const i = process.env.INTERVAL || 5000
    console.log(`Mail Service is running every ${+i / 1000} seconds...`)

    setInterval(async () => {

      const email = await this.emailModel.aggregate([
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
          await this.sendMail({ to, subject, text, attachments, from: room.email })
          await this.emailModel.updateOne({ _id: email[0]._id }, { sent: true })
        } catch (err) {
          console.log(err)
        }
      } else
        console.log('No emails to send')


    }, +i)

  }

}
