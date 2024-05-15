import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import UserChangePasswordDto from './dto/user-change-password.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public getAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        balance: true,
        phone: true,
        isAdmin: true,
      },
    });
  }

  public async changePassword(dto: UserChangePasswordDto) {
    const user = await this.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException('пароли не совпадают');
    }

    return this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await hash(dto.password, await genSalt(3)),
      },
    });
  }

  private async validateUser(dto: UserChangePasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValidPassword = await compare(dto.oldPassword, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }
}
