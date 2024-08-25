import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/devConfigService';
import { Song } from './songs/song.entity';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { Artist } from './artists/artist.entity';
import { User } from './users/user.entity';
import { Playlist } from './playlists/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { PlaylistsController } from './playlists/playlists.controller';
import { AuthModule } from './auth/auth.module';

const devConfig = { port: 3000 };
const proConfig = { port: 400 };

@Module({
  imports: [
    SongsModule,
    PlaylistsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'spotify-clone',
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV !== 'production' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log({ database: dataSource.driver.database });
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST });
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
    consumer.apply(LoggerMiddleware).forRoutes(PlaylistsController);
    // throw new Error('Method not implemented');
  }
}
