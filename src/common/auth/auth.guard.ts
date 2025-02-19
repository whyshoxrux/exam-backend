import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { ConfigService } from '../config/config.service';
  import * as jwt from 'jsonwebtoken';
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private configService: ConfigService) {}
  
    canActivate(context: ExecutionContext): boolean {
      try {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = request.headers['authorization']?.split(' ')[1];
        // console.log(request.headers); 
        
        if (!token) {
          console.log(1243253)
          response.status(401).json({
            message: 'Kalit berilmagan',
            error: 'Unauthorized',
            statusCode: 401,
          });
        }
        const result = jwt.verify(
          token,
          this.configService.get('JWT_ACCESS_SECRET'),
        );
        request.user = result;
        return true;
      } catch (error) {
        console.log(error.message);
        throw new ForbiddenException('Kalit eskirgan');
      }
    }
  }
  