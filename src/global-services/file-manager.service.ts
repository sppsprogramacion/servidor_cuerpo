import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { PersonalService } from '../personal/personal.service';

@Injectable()
export class FileManagerService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly PersonalService: PersonalService
    ){}

    async cargarFoto(foto_url: string, id: number, tipo: string){
        let existe: any;
        try {
            if(tipo === "usuario"){
                existe = this.usuarioService.getOne(id);      
              }else if(tipo === "personal"){
                existe = this.PersonalService.getOne(id);    
              }
            if(!existe){
                throw new BadRequestException('No existe el registro que intenta asociar a la Imagen');
            }
            
        } catch (error) {
            
        }

    }
}
