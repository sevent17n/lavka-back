import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import AuthService from './auth.service';
import AuthRegisterDto from './dto/auth-register.dto';
import { AuthDto } from './dto/auth.dto';
import AuthRefreshTokenDto from './dto/auth-refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('refresh')
  async refreshToken(@Body() dto: AuthRefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }
}
