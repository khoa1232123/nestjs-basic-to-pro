import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Request,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Connection } from 'src/common/constants/connection';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import { Song } from './song.entity';
import { SongsService } from './songs.service';
import { ArtistJwtGuard } from 'src/artists/artist.jwt-guard';
import { request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'songs', scope: Scope.REQUEST })
@ApiTags('Songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log({ connection: this.connection });
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Post()
  @UseGuards(ArtistJwtGuard)
  create(
    @Body() createSongDto: CreateSongDTO,
    @Request() request,
  ): Promise<Song> {
    console.log(request.user);

    return this.songsService.create(createSongDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSong: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSong);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
