import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ArtistsModule } from 'src/artists/artists.module';
import { UsersModule } from 'src/users/users.module';
import { authConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtStrategy } from './auth.jwt.strategy';
import { ApiKeyStrategy } from './api-key.strategy';

@Module({
  providers: [AuthService, AuthJwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UsersModule,
    ArtistsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
})
export class AuthModule {}
