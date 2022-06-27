import { Module } from '@nestjs/common';
import { SupportersController } from './supporters.controller';
import { SupportersService } from './supporters.service';
import { Supporter, SupporterSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicStrategy } from '../auth/Strategy';


@Module({
  controllers: [SupportersController],
  providers: [SupportersService, BasicStrategy],
  imports: [MongooseModule.forFeature([{ name: Supporter.name, schema: SupporterSchema }])]
})
export class SupportersModule { }
