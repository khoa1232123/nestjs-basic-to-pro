import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('Playlists')
export class PlaylistsController {
  constructor(
    private playlistService: PlaylistsService, // Add service here
  ) {}

  @Post()
  async create(
    @Body()
    playlistDTO: CreatePlaylistDTO,
  ): Promise<Playlist> {
    return await this.playlistService.create(playlistDTO);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Playlist>> {
    limit = limit > 100 ? 100 : limit;
    return this.playlistService.paginate({ page, limit });
  }
}
