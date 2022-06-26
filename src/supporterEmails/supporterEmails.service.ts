import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Email, Attachment } from './schemas';
import { MailsService } from './mail.service'
@Injectable()
export class SupporterEmailsService {
  constructor(@InjectModel(Email.name) private emailModel: Model<any>,
    @InjectModel(Attachment.name) private attachmentModel: Model<any>) {

    const mailsService = new MailsService(emailModel)
    mailsService.init()
  }

  createEmail = async ({ to, subject, text, supporter, room }) => {
    return await new this.emailModel({
      to, subject, text,
      date_created: new Date(),
      supporter,
      room
    }).save()
  }

  createAttachment = async ({ file, email }) => {
    return await new this.attachmentModel({
      ...file, email
    }).save()
  }

}
