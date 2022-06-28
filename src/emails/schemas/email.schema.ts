import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: false })
  sent: boolean;

  @Prop({ required: true, ref: 'room' })
  room: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'supporter' })
  supporter: mongoose.Schema.Types.ObjectId;

  @Prop({ default: new Date() })
  date_created: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email)