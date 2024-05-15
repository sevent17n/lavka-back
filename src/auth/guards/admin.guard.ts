import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ user: any }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    if (!user.isAdmin) {
      throw new ForbiddenException('You have no rights');
    }

    return user.isAdmin;
  }
}
