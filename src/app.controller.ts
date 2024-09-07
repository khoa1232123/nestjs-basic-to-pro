import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthJwtGuard } from './auth/auth.jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(AuthJwtGuard)
  getProfile(@Req() req: any) {
    console.log('hello');
    return req.user;
  }
}
