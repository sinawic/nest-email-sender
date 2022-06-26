import { Module } from '@nestjs/common';
import { BasicStrategy } from '../auth';
import { AdminSupportersController } from './adminSupporters.controller';
import { AdminSupportersService } from './adminSupporters.service';
import { Supporter, SupporterSchema } from './schemas/';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  controllers: [AdminSupportersController],
  providers: [AdminSupportersService, BasicStrategy],
  imports: [MongooseModule.forFeature([{ name: Supporter.name, schema: SupporterSchema }])]
})
export class AdminSupportersModule { }
