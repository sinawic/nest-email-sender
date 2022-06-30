import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import mongoose from 'mongoose';

export class IdDto {
  @Type(() => mongoose.Types.ObjectId)
  @IsObjectId()
  // @IsNotEmpty()
  _id: mongoose.Types.ObjectId;
}
