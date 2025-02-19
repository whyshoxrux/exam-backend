import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'JWT_ACCESS_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AuthModule {}
