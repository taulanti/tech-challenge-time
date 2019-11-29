import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, username: string }> {
    const username = await this.userRepository.signIn(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { username, accessToken };
  }
}
