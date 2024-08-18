import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService) {}
  @Get()
  findAll() {

    return this.songsService.findAll;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Find song with id ${id}`;
  }

  @Post()
  create(@Body() createSongDto: CreateSongDTO) {
    return this.songsService.create(createSongDto);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `Update song with id ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete song with id ${id}`;
  }
}
