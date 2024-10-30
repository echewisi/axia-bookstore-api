import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Author extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  name: string;

  @Prop({ required: true, minlength: 10, maxlength: 500 })
  bio: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
