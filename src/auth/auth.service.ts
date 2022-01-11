import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsuarioService
    ){}

    async validateUser(email: string, clave: string): Promise<any>{
        const user = await this.userService.getUserByEmail(email);
        console.log('EL USUARIO ES', user);
        //(user && await compare(clave,  user.clave))? user: null;
        if(user && await compare(clave,  user.clave)){
            return user;
        }
        return null;
    }

}
