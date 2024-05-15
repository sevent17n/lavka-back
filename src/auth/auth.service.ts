import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import AuthRegisterDto from './dto/auth-register.dto';
import { PrismaService } from '../prisma.service';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import AuthRefreshTokenDto from './dto/auth-refresh-token.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: AuthRegisterDto) {
    const [isUser] = await Promise.all([
      this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      }),
    ]);

    if (isUser) {
      throw new BadRequestException('This email already exist');
    }

    const password = await hash(dto.password, await genSalt(3));
    await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: password,
        fio: dto.fio,
        phone: dto.phone,
        balance: 0,
      },
    });

    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const { password: _, ...userWithoutPassord } = user;

    const tokens = await this.issueTokenPair(user.id);

    return {
      user: userWithoutPassord,
      ...tokens,
    };
  }

  public async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokenPair(user.id);

    const { password: _, ...userWithoutPassord } = user;

    return {
      user: userWithoutPassord,
      ...tokens,
    };
  }

  public async refreshToken({ refreshToken }: AuthRefreshTokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException('Sign in, bastard');
    }

    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) {
      throw new UnauthorizedException('Invalid token or expired');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: result._id,
      },
    });
    const { password, ...userWithoutPassord } = user;
    const tokens = await this.issueTokenPair(user.id);

    return {
      user: userWithoutPassord,
      ...tokens,
    };
  }

  private async issueTokenPair(id: number) {
    const data = { _id: id };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }
}
