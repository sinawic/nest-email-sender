import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Supporter } from '../supporters/schemas/';

import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sha1 } from '../common/utils';
import { CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(Supporter.name) private supporterModel: Model<any>
  ) { }


  getSupporterByCred = async ({ username, password, room }: { username: string, password: string, room: string }) => {
    return await this.supporterModel.findOne({
      username, room, password: sha1(password), active: true
    })
  }

  validateLogin = async (createUserDto: CreateUserDto) => {
    try {
      const supporter = await this.getSupporterByCred(createUserDto)
      if (!supporter)
        throw new HttpException('Invalid username or password or wrong room', HttpStatus.BAD_REQUEST)

      return this.signToken(supporter);
    } catch (error: any) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  async signToken({ _id, username, room }): Promise<{ access_token: string }> {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const token = await this.jwt.signAsync(
      { _id, username, room }
    );

    return {
      access_token: token,
    };
  }

  getRequesterSupporter = async ({ _id, room }) => {
    return await this.supporterModel.findOne({
      _id,
      room, active: true
    })
  }

}
