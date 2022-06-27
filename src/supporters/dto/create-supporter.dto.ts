import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

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
