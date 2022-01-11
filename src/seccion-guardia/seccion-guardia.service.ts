import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeccionGuardia } from './entities/seccion-guardia.entity';
import { Repository } from 'typeorm';
import { EditSeccionGuardiaDto } from './dto/edit-seccion-guardia.dto';
import { CreateSeccionGuardiaDto } from './dto/create-seccion-guardia.dto';

@Injectable()
export class SeccionGuardiaService {
    constructor(
        @InjectRepository(SeccionGuardia)
        private readonly seccionRepository: Repository<SeccionGuardia>
    ) {}

    /**
     * Servicio que retorna todos los registros
     * @returns 
     */
    async getAll(){
        return await this.seccionRepository.find();
    }

    /**
     * Servicio que retorna un registro según Id
     * @param id 
     * @returns 
     */
    async getOne(id: number){
        return await this.seccionRepository.findOneOrFail(id);
    }

    /**
     * Servicio que modifica un registro según Id
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditSeccionGuardiaDto){
        const respuesta = await this.seccionRepository.update(id, data);
        if(respuesta.affected == 0) throw new NotFoundException('No existe el registro que desea modificar');
        return respuesta;        
    }

    /**
     * Servicio que elimina un registro según Id
     * @param id 
     * @returns 
     */
    async deleteOne(id: number){
        const respuesta = await this.seccionRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro que desea eliminar");
        return await this.seccionRepository.remove(respuesta);
     }

     /**
      * Servicio que crea un registro 
      * @param data 
      */
     async createOne(data: CreateSeccionGuardiaDto){
        const existe = await this.seccionRepository.findOne({
            seccion: data.seccion,
            departamento_id: data.departamento_id
        });
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.seccionRepository.create(data);
        return await this.seccionRepository.save(nuevo);
        
     }


        
    }

