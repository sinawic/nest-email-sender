import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

import { MongooseModule } from '@nestjs/mongoose';

import { Room, RoomSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  controllers: [RoomsController],
  providers: [RoomsService, BasicStrategy]
})
export class RoomsModule { }
