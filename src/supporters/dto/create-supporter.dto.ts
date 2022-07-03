import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IdDto } from 'src/common/dto';
import { Type } from 'class-transformer';

export class CreateSupporterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  room: string;
}

export class EditSupporterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Type(() => IdDto)
  _id: IdDto;
}
