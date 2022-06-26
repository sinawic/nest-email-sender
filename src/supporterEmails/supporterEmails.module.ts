import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth';
import { SupporterEmailsController } from './supporterEmails.controller';
import { SupporterEmailsService } from './supporterEmails.service';
import { SupporterService } from './../supporter/supporter.service';
import { JwtModule } from '@nestjs/jwt';
import { Supporter, SupporterSchema } from '../adminSupporters/schemas/';
import { Attachment, AttachmentSchema, Email, EmailSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [JwtModule.register({}),
  MongooseModule.forFeature([{ name: Supporter.name, schema: SupporterSchema },
  { name: Attachment.name, schema: AttachmentSchema },
  { name: Email.name, schema: EmailSchema }])],
  controllers: [SupporterEmailsController],
  providers: [SupporterEmailsService, SupporterService, JwtStrategy]
})
export class SupporterEmailModule { }
