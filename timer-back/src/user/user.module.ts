import { Module } from '@nestjs/common';
import { AuthController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../common/authentication/Passport/jwt.strategy';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { AuthService } from 'src/common/authentication/auth.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    JwtStrategy,
    AuthService
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ],
})
export class UserModule { }
