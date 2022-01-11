import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoCivil } from './entities/estado-civil.entity';
import { Repository } from 'typeorm';
import { EditEstadoCivilDto } from './dto/edit-estado-civil.dto';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';

@Injectable()
export class EstadoCivilService {
    constructor(
        @InjectRepository(EstadoCivil)
        private readonly estadoRepository: Repository<EstadoCivil>
    ){}

    /**
     * Servicio que retorna todos los registros de la tabla ESTADO CIVIL
     * @returns 
     */
     async getAll(){
        return await this.estadoRepository.findAndCount();
    }

    /**
     * Servicio que retorna un registro de la tabla ESTADO CIVIL según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.estadoRepository.findOneOrFail(id);
    }

    /**
     * Servicio que edita un registro de la tabla ESTADO CIVIL según id
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditEstadoCivilDto){
        const respuesta = await this.estadoRepository.update(id,data);
        if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro de Estado Civil que intenta modificar");
        return respuesta;
    }
    
    /**
     * Servicio que elimina un registro de la tabla SEXO según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
     async deleteOne(id: number){
        const respuesta = await this.estadoRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro ESTADO CIVIL que desea eliminar");
        return await this.estadoRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla ESTADO CIVIL
     * @param data 
     * @returns 
     */
     async createOne(data: CreateEstadoCivilDto){
        const existe = await this.estadoRepository.findOne({estado_civil: data.estado_civil});
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.estadoRepository.create(data);
        return await this.estadoRepository.save(nuevo)
    }




}
