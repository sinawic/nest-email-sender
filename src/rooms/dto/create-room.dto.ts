import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from '../../common/dto';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  website: string;
}

export class EditRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @Type(() => IdDto)
  _id: IdDto;
}

