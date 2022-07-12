import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IdDto } from '../../common/dto';
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
