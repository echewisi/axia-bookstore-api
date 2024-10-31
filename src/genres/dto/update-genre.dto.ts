// genres/dto/update-genre.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
