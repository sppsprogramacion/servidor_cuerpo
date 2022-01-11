import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCiudadDto, EditCiudadDto } from './dto';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {

    constructor(
        @InjectRepository(Ciudad)
        private readonly ciudadRepository: Repository<Ciudad>
    ){}

     /**
     * Servicio que retorna todos los registros de la tabla CIUDAD
     * @returns 
     */
      async getAll(){
        return await this.ciudadRepository.find();
    }

    /**
     * Servicio que retorna un registro de la tabla Ciudad según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.ciudadRepository.findOneOrFail(id);
    }

    /**
     * Servicio que edita un registro de la tabla Ciudad según id
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditCiudadDto){
        const respuesta = await this.ciudadRepository.update(id,data);
        if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro de Ciudad que intenta modificar");
        return respuesta;
    }
    
    /**
     * Servicio que elimina un registro de la tabla SEXO según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
     async deleteOne(id: number){
        const respuesta = await this.ciudadRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro CIUDAD que desea eliminar");
        return await this.ciudadRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla ESTADO CIVIL
     * @param data 
     * @returns 
     */
     async createOne(data: CreateCiudadDto){
        const existe = await this.ciudadRepository.findOne({ciudad: data.ciudad});
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.ciudadRepository.create(data);
        return await this.ciudadRepository.save(nuevo)
    }


}
