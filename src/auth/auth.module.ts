import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Supporter, SupporterSchema } from '../supporters/schemas/';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: Supporter.name, schema: SupporterSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
