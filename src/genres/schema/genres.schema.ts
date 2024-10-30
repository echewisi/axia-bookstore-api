import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Genre extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  name: string;

  @Prop({ required: true, minlength: 10, maxlength: 500 })
  description: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
