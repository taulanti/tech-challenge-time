import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from "../user/model/user.entity";
import { AuthService } from 'src/common/authentication/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private authService: AuthService
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ username: string, token: string }> {
    const username = await this.userRepository.signUp(authCredentialsDto);
    const payload = { username };
    const token = await this.authService.signPayload(payload);

    return { username, token };
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string, username: string }> {
    const username = await this.userRepository.signIn(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    const token = await this.authService.signPayload(payload);

    return { token, username };
  }

}
