import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get, HttpCode } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserService } from './user.service';
import { User } from './model/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) { }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ username: string, token: string }> {
    return this.userService.signUp(authCredentialsDto);
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ token: string, username: string }> {
    return this.userService.signIn(authCredentialsDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard())
  @Get()
  async getUser(@GetUser() user: User): Promise<{ username: string, id: number }> {
    return { username: user.username, id: user.id };
  }

}
