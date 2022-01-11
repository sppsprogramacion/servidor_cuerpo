import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,"local"){

    constructor(
        private authService: AuthService
    ){
        super({
            usernameField: "correo",
            passwordField: "clave"
        });
    };

    async validate(correo: string, clave: string){
         let user = null;
        user = await this.authService.validateUser(correo, clave);
        if (!user){
            throw new UnauthorizedException("El usuario o la contraseña no coinciden");
    }else{
        return user;
    }
}

}