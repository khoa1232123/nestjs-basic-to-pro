import { Exclude } from 'class-transformer';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  @Exclude()
  password: string;

  // @OneToOne(() => Artist)
  // @JoinColumn()
  // artist: Artist;

  // a user can create many playlists
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
