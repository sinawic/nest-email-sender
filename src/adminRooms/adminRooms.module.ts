import { Module } from '@nestjs/common';
import { BasicStrategy } from 'src/adminStrategy';
import { AdminRoomsController } from './adminRooms.controller';
import { AdminRoomsService } from './adminRooms.service';


@Module({
  controllers: [AdminRoomsController],
  providers: [AdminRoomsService, BasicStrategy]
})
export class AdminRoomsModule { }
