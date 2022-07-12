import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Supporter, SupporterSchema } from '../supporters/schemas/';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => (
      { secret: process.env.ACCESS_TOKEN_SECRET, signOptions: { expiresIn: process.env.EXPIRE_T } }
    )
  }), MongooseModule.forFeature([{ name: Supporter.name, schema: SupporterSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
