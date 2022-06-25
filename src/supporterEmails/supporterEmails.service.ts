import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { SupporterEmailsModels } from './supporterEmails.models';

@Injectable()
export class SupporterEmailsService {
  constructor(private emailsModels: SupporterEmailsModels) { }

  createEmail = async ({ to, subject, text, supporter, room }) => {
    return await new this.emailsModels.Email({
      to, subject, text,
      date_created: new Date(),
      supporter,
      room
    }).save()
  }

  createAttachment = async ({ file, email }) => {
    return await new this.emailsModels.Attachment({
      ...file, email: new mongoose.Types.ObjectId(email._id)
    }).save()
  }

}
