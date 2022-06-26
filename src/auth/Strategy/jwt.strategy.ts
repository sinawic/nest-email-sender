import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SupporterService } from '../../supporter/supporter.service';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    private supporterService: SupporterService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate({ _id, room }) {
    const user = await this.supporterService.getRequesterSupporter({ _id, room })
    return user;
  }
}
