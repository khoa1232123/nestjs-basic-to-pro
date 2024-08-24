import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Each Playlist will have multiple songs
  // @OneToMany(() => Song, (song) => song.playList)
  // songs: Song[];

  //   Many Playlists can belong to a single unique user
  // @ManyToOne(() => User, (user) => user.playLists)
  // user: User;
}
