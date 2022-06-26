import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminRoomsModule } from './adminRooms/adminRooms.module';
import { AdminSupportersModule } from './adminSupporters/adminSupporters.module';
import { SupporterEmailModule } from './supporterEmails/supporterEmails.module';
import { SupporterModule } from './supporter/supporter.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb://root:example@localhost:27017/express?authSource=admin"),
    AdminRoomsModule,
    AdminSupportersModule,
    SupporterEmailModule,
    SupporterModule
  ],
  providers: []
})
export class AppModule { }
