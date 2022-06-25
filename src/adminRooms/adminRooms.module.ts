import { Module } from '@nestjs/common';
import { BasicStrategy } from '../auth';
import { AdminRoomsController } from './adminRooms.controller';
import { AdminRoomsService } from './adminRooms.service';

import { AdminRoomsModels } from './adminRooms.models';

@Module({
  controllers: [AdminRoomsController],
  providers: [AdminRoomsModels, AdminRoomsService, BasicStrategy]
})
export class AdminRoomsModule { }
