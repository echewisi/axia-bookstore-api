import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from '../../authors/schema/authors.schema';
import { Genre } from '../../genres/schema/genres.schema';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
  author: Author | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Genre', required: true })
  genre: Genre | Types.ObjectId;

  @Prop({ type: Date, required: true })
  published_date: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
