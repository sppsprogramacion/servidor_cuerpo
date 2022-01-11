import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Situacion } from './entities/situacion.entity';
import { Repository } from 'typeorm';
import { EditSituacionDto } from './dto/edit-situacion.dto';
import { CreateSituacionDto } from './dto/create-situacion.dto';

/**
 * Servicio de la tabla SITUACION - CRUD básico
 */
@Injectable()
export class SituacionService {
    
    constructor(
        @InjectRepository(Situacion)
        private readonly situacionRepository: Repository<Situacion>
    ){ }
    /**
     * Servicio que retorna todos los registros de la tabla SITUACION
     * @returns 
     */
    async getAll(){
        return await this.situacionRepository.find();
    }

    /**
     * Servicio que retorna un registro SITUACION segun ID
     * @param id 
     * @returns 
     */
    async getOne(id:number){
        return await this.situacionRepository.findOneOrFail(id);
    }

    /**
     * Servicio que modifica un registro de SITUACION segun ID
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditSituacionDto){
        const respuesta = await this.situacionRepository.update(id, data);
        if(respuesta.affected == 0) throw new NotFoundException("No existe la SITUACION que desea modificar");
        return respuesta;        
    }

    /**
     * Servicio que elimina un registro SITUACION segun ID
     * @param id 
     * @returns 
     */
    async deleteOne(id: number){
        const situacionSeleccionada = await this.situacionRepository.findOne(id);
        if(!situacionSeleccionada) throw new NotFoundException("No existe la SITUACION que desea eliminar");
        return await this.situacionRepository.remove(situacionSeleccionada);
        
    }

    /**
     * Servicio que crea un nuevo registro SITUACION
     * @param data 
     */
    async createOne(data: CreateSituacionDto){
        const existe = await this.situacionRepository.findOne({
            situacion: data.situacion
        });
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        
        const nuevo = this.situacionRepository.create(data);
        return await this.situacionRepository.save(nuevo);


    }

}
