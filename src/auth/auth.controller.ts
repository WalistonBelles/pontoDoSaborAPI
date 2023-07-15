import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from 'src/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async signIn(@Body() signInDto: User) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
