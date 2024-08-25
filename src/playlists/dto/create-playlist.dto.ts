import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator';
import { Song } from 'src/songs/song.entity';

export class CreatePlaylistDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: Song[];

  @IsNotEmpty()
  @IsNumber()
  readonly user: number;
}
