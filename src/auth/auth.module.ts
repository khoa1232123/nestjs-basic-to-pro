import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ArtistsModule } from 'src/artists/artists.module';
import { UsersModule } from 'src/users/users.module';
import { authConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtStrategy } from './auth.jwt.strategy';
import { ApiKeyStrategy } from './api-key.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, AuthJwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UsersModule,
    ArtistsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
