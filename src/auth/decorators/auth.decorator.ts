import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

export const Auth = (isAdmin: boolean) => {
  return applyDecorators(
    isAdmin ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard),
  );
};
