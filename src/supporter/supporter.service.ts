import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sha1 } from 'src/helpers';
import { AdminSupportersModels } from '../adminSupporters/adminSupporters.models';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

@Injectable()
export class SupporterService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  getSupporterByCred = async ({ username, password, room }: { username: string, password: string, room: string }) => {
    return await AdminSupportersModels.Supporter.findOne({
      username, room, password: sha1(password), active: true
    })
  }

  validateLogin = async ({ username, room, password }) => {
    try {
      const supporter = await this.getSupporterByCred({ username, room, password })
      if (!supporter)
        throw new HttpException('Invalid username or password or wrong room', HttpStatus.BAD_REQUEST)

      return this.signToken(supporter);
    } catch (error: any) {
      throw new HttpException({ error: error.toString() }, HttpStatus.BAD_REQUEST)
    }
  }

  async signToken({ _id, username, room }): Promise<{ access_token: string }> {
    const secret = this.config.get('ACCESS_TOKEN_SECRET');
    const token = await this.jwt.signAsync(
      { _id, username, room },
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }

  getRequesterSupporter = async ({ _id, room }) => {
    return await AdminSupportersModels.Supporter.findOne({
      _id: new mongoose.Types.ObjectId(_id),
      room: new mongoose.Types.ObjectId(room), active: true
    })
  }

}
