import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from 'src/common/constants/connection';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { Playlist } from './playlist.entity';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
