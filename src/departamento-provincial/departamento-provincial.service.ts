import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDptoProvDto } from './dto/create-dpto-prov.dto';
import { EditDptoProvDto } from './dto/edit-dpto-prov.dto';

import { DepartamentoProvincial } from './entity/dpto-prov.entity';

@Injectable()
export class DepartamentoProvincialService {
    constructor(
        @InjectRepository(DepartamentoProvincial)
        private readonly dptoProvRepository: Repository<DepartamentoProvincial>
    ){}

    /**
     * Servicio que retorna todos los registros de DEPARTAMENTO PROVINCIAL
     * @returns 
     */
     async getAll(){
        return await this.dptoProvRepository.findAndCount();
    }

    /**
     * Servicio que retorna un registro de la tabla DEPARTAMENTO PROVINCIAL según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.dptoProvRepository.findOneOrFail(id);
    }

    /**
     * Servicio que edita un registro de la tabla DEPARTAMENTO PROVINCIAL según id
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditDptoProvDto){
        const respuesta = await this.dptoProvRepository.update(id,data);
        if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro Departamento que intenta modificar");
        return respuesta;
    }
    
    /**
     * Servicio que elimina un registro de la tabla DEPARTAMENTO PROVINCIAL según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
     async deleteOne(id: number){
        const respuesta = await this.dptoProvRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro ESTADO CIVIL que desea eliminar");
        return await this.dptoProvRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla DEPARTAMENTO PROVINCIAL
     * @param data 
     * @returns 
     */
     async createOne(data: CreateDptoProvDto){
        const existe = await this.dptoProvRepository.findOne({departamento_provincial: data.departamento_provincial});
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.dptoProvRepository.create(data);
        return await this.dptoProvRepository.save(nuevo)
    }




}
