import {
  IsArray,
  IsDateString,
  IsEmpty,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Artist } from 'src/artists/artist.entity';

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: Artist[];

  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
