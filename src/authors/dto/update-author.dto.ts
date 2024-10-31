// authors/dto/update-author.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
