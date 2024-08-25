import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private songRepo: Repository<Song>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll(): Promise<Playlist[]> {
    return this.playlistRepo.find();
  }

  async create(playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    const songs = await this.songRepo.findBy({ id: In(playlistDTO.songs) });

    const user = await this.userRepo.findOneBy({ id: playlistDTO.user });
    return this.playlistRepo.save({ ...playlistDTO, songs, user });
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Playlist>> {
    const queryBuilder = this.playlistRepo.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC');
    return paginate<Playlist>(queryBuilder, options);
  }
}
