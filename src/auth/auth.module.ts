import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {expiresIn: '24h'}
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
