import { Module } from '@nestjs/common';
import { BasicStrategy } from '../auth';
import { AdminRoomsController } from './adminRooms.controller';
import { AdminRoomsService } from './adminRooms.service';

import { MongooseModule } from '@nestjs/mongoose';

import { Room, RoomSchema } from './schemas/';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  controllers: [AdminRoomsController],
  providers: [AdminRoomsService, BasicStrategy]
})
export class AdminRoomsModule { }
