import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";
import { ConfigService } from "src/config/config.service";
import { JwtPayload } from "./Passport/jwt-payload.interface";
import { User } from "src/user/model/user.entity";

@Injectable()
export class AuthService {
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        readonly _userService: UserService,
        private readonly configService: ConfigService,
        private jwtService: JwtService
    ) {
        this.jwtKey = this.configService.get('JWT_KEY');
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async validateUser(validatePayload: JwtPayload): Promise<User> {
        return User.findOne({ username: validatePayload.username});
    }
}