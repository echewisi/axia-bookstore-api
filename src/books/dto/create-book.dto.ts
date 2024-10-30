// books/dto/create-book.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  author: string;

  @IsMongoId()
  @IsNotEmpty()
  genre: string;

  @IsDateString()
  @IsNotEmpty()
  published_date: Date;
}
