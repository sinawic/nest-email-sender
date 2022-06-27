import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/Strategy';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { JwtModule } from '@nestjs/jwt';
import { Supporter, SupporterSchema } from '../supporters/schemas';
import { Attachment, AttachmentSchema, Email, EmailSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [JwtModule.register({}),
  MongooseModule.forFeature([{ name: Supporter.name, schema: SupporterSchema },
  { name: Attachment.name, schema: AttachmentSchema },
  { name: Email.name, schema: EmailSchema }])],
  controllers: [EmailsController],
  providers: [EmailsService, JwtStrategy, AuthService]
})
export class EmailModule { }
