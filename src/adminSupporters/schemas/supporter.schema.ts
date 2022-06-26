import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SupporterDocument = Supporter & Document;

@Schema()
export class Supporter {
  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true, ref: 'room' })
  room: mongoose.Schema.Types.ObjectId;

  @Prop({ default: new Date() })
  date_created: Date;
}

export const SupporterSchema = SchemaFactory.createForClass(Supporter)