import { Module } from '@nestjs/common';
import { JwtStrategy } from '../adminStrategy';
import { SupporterEmailsController } from './supporterEmails.controller';
import { SupporterEmailsService } from './supporterEmails.service';
import { SupporterService } from './../supporter/supporter.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SupporterEmailsController],
  providers: [SupporterEmailsService, SupporterService, JwtStrategy]
})
export class SupporterEmailModule { }
