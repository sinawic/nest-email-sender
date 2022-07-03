import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id'
import mongoose from 'mongoose';
import { IdDto } from 'src/common/dto';
import { Type } from 'class-transformer';

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

  @Type(() => IdDto)
  supporter: IdDto;

  @Type(() => IdDto)
  room: IdDto;
}
