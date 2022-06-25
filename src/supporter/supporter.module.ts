import { Module } from '@nestjs/common';
import { SupporterController } from './supporter.controller';
import { SupporterService } from './supporter.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminSupportersModels } from '../adminSupporters/adminSupporters.models';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SupporterController],
  providers: [AdminSupportersModels, SupporterService]
})
export class SupporterModule { }
