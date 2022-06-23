import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { SupporterEmailsModels } from './supporterEmails.models';

@Injectable()
export class SupporterEmailsService {
  constructor(
    private jwt: JwtService,
  ) { }


}
