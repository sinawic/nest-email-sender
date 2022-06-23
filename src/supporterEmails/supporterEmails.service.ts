import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { SupporterEmailsModels } from './supporterEmails.models';

@Injectable()
export class SupporterEmailsService {
  constructor() { }

  createEmail = async ({ to, subject, text, supporter, room }) => {
    return await new SupporterEmailsModels.Email({
      to, subject, text,
      date_created: new Date(),
      supporter,
      room
    }).save()
  }

  createAttachment = async ({ file, email }) => {
    return await new SupporterEmailsModels.Attachment({
      ...file, email: new mongoose.Types.ObjectId(email._id)
    }).save()
  }

}
