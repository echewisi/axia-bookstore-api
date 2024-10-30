// books/dto/update-book.dto.ts
import { IsString, IsOptional, IsDateString, IsMongoId } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsOptional()
  author?: string;

  @IsMongoId()
  @IsOptional()
  genre?: string;

  @IsDateString()
  @IsOptional()
  published_date?: Date;
}
