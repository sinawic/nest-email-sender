import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { SupportersModule } from './supporters/supporters.module';
import { EmailModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    RoomsModule,
    SupportersModule,
    EmailModule,
    AuthModule
  ],
  providers: []
})
export class AppModule { }
