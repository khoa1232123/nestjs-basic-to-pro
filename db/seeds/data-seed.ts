import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.entity';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';

export const seedData = async (manager: EntityManager): Promise<void> => {
  // add your seeding logic here using the manager object
  // For example, you can create and save new entities to the database
  await seedUser();
  await seedArtist();
  await seedPlaylists();

  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuidv4();
    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuidv4();

    const artist = new Artist();
    artist.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Artist).save(artist);
  }

  async function seedPlaylists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuidv4();

    const playlist = new Playlist();
    playlist.user = user;
    playlist.name = faker.music.songName();
    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playlist);
  }
};
