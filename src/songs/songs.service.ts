import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  private readonly songs = [];

  create(song: any) {
    const id = Date.now(); // Generate unique id for each song.
    this.songs.push({ ...song, id });
    return this.songs;
  }

  findAll() {
    return this.songs;
  }

  findOne(id: number) {
    const idx = this.songs.findIndex((item) => item.id === id);
    if (idx !== -1) {
      return this.songs[idx];
    } else {
      throw new Error(`Song with id ${id} not found`);
    }
  }
}
