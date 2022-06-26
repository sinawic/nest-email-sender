import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ default: process.env.SOURCE_EMAIL })
  email: string;

  @Prop({ required: true })
  website: string;

  @Prop({ default: new Date() })
  date_created: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room)