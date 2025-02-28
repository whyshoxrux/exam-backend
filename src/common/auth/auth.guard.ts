import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) { }

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization']?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token berilmagan');
      }

      const secret = this.configService.get('JWT_ACCESS_SECRET');

      if (!secret) {
        throw new Error('JWT_ACCESS_SECRET aniqlanmagan');
      }

      const result = jwt.verify(token, secret);

      if (!result || !result['data']) {
        throw new UnauthorizedException('Token noto‘g‘ri');
      }

      request.user = result['data']

      return true;

    } catch (error) {
      console.log('AuthGuard xatosi:', error.message);

      throw new ForbiddenException('Token eskirgan yoki noto‘g‘ri');
    }
  }
}
