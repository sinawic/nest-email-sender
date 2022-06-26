import { Module } from '@nestjs/common';
import { SupporterController } from './supporter.controller';
import { SupporterService } from './supporter.service';
import { JwtModule } from '@nestjs/jwt';
import { Supporter, SupporterSchema } from '../adminSupporters/schemas/';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: Supporter.name, schema: SupporterSchema }])],
  controllers: [SupporterController],
  providers: [SupporterService]
})
export class SupporterModule { }
