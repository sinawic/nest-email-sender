import { Module } from '@nestjs/common';
import { BasicStrategy } from '../adminStrategy';
import { AdminSupportersController } from './adminSupporters.controller';
import { AdminSupportersService } from './adminSupporters.service';


@Module({
  controllers: [AdminSupportersController],
  providers: [AdminSupportersService, BasicStrategy]
})
export class AdminSupportersModule { }
