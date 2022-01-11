import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from '../usuario/usuario.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    UsuarioModule
  ],
  providers: [
    AuthService,
    LocalStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
