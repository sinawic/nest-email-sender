import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth';
import { SupporterEmailsController } from './supporterEmails.controller';
import { SupporterEmailsService } from './supporterEmails.service';
import { SupporterService } from './../supporter/supporter.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminSupportersModels } from '../adminSupporters/adminSupporters.models';
import { SupporterEmailsModels } from './supporterEmails.models';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SupporterEmailsController],
  providers: [SupporterEmailsModels, AdminSupportersModels, SupporterEmailsService, SupporterService, JwtStrategy]
})
export class SupporterEmailModule { }
