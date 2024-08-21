import { Playlist } from 'src/playlists/playlist.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // a user can create many playlists
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
