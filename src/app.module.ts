import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminRoomsModule } from './adminRooms/adminRooms.module';
import { AdminSupportersModule } from './adminSupporters/adminSupporters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminRoomsModule,
    AdminSupportersModule
  ],
  providers: []
})
export class AppModule { }
