import { Module } from '@nestjs/common';
import { BasicStrategy } from '../auth';
import { AdminSupportersController } from './adminSupporters.controller';
import { AdminSupportersService } from './adminSupporters.service';
import { AdminSupportersModels } from './adminSupporters.models';


@Module({
  controllers: [AdminSupportersController],
  providers: [AdminSupportersModels, AdminSupportersService, BasicStrategy]
})
export class AdminSupportersModule { }
