import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id'
import mongoose from 'mongoose';

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class SaveEmailDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsObjectId()
  @IsNotEmpty()
  supporter: mongoose.Types.ObjectId;

  @IsObjectId()
  @IsNotEmpty()
  room: mongoose.Types.ObjectId;
}
