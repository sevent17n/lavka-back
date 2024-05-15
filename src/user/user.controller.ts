import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import UserChangePasswordDto from './dto/user-change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('change-password')
  public async changePassword(@Body() dto: UserChangePasswordDto) {
    return this.userService.changePassword(dto);
  }

  @Auth(true)
  @Get('getAll')
  public getAll() {
    return this.userService.getAll();
  }
}
