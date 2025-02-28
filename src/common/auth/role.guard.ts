import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '../config/config.service';
import { AuthGuard } from './auth.guard';

@Injectable()
export class RoleGuard extends AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    configService: ConfigService,
  ) {
    super(configService);
  }

  canActivate(context: ExecutionContext) {
    const isAuth = super.canActivate(context);
    if (!isAuth) return false;

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(requiredRoles, user);

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Huquqingiz yetarli emas');
    }

    return true;
  }
}
