import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Supporter } from '../supporters/schemas/';

import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
const crypto = require('crypto')

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(Supporter.name) private supporterModel: Model<any>
  ) { }

  sha1(val: string) {
    var shasum = crypto.createHash('sha1')
    shasum.update(val)
    return shasum.digest('hex')
  }

  getSupporterByCred = async ({ username, password, room }: { username: string, password: string, room: string }) => {
    return await this.supporterModel.findOne({
      username, room, password: this.sha1(password), active: true
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
    const secret = process.env.ACCESS_TOKEN_SECRET;
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
    return await this.supporterModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
      room: new mongoose.Types.ObjectId(room), active: true
    })
  }

}
