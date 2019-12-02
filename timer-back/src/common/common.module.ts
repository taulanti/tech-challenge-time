import { Global, Module } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { JwtStrategy } from "./authentication/Passport/jwt.strategy";
import { UserModule } from "src/user/user.module";
import { ConfigModule } from "src/config/config.module";
import { AuthService } from "./authentication/auth.service";

@Global()
@Module({
    providers: [ConfigService, JwtStrategy, AuthService],
    exports: [JwtStrategy, AuthService],
    imports: [UserModule, ConfigModule],
})
export class CommonModule {
}