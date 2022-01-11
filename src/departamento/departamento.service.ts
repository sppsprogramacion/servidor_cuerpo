import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';
import { EditDepartamentoDto } from './dto/edit-departamento.dto';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';

@Injectable()
export class DepartamentoService {

    constructor(
        @InjectRepository(Departamento)
        private readonly departamentoRepository: Repository<Departamento>
    ){}

    /**
     * Servicio que retorna todos los registros de la tabla DEPARTAMENTO
     * @returns 
     */
     async getAll(){
        return await this.departamentoRepository.find();
    }

    /**
     * Servicio que retorna un registro de la tabla DEPARTAMENTO según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.departamentoRepository.findOneOrFail(id);
    }

    /**
     * Servicio que edita un registro
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditDepartamentoDto){
        const respuesta = await this.departamentoRepository.update(id,data);
        if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro Departamento que intenta modificar");
        return respuesta;
    }

    /**
     * Servicio que elimina un registro de la tabla DEPARTAMENTO según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
     async deleteOne(id: number){
        const respuesta = await this.departamentoRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro Departamento que desea eliminar");
        return await this.departamentoRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla DEPARTAMENTO
     * @param data 
     * @returns 
     */
     async createOne(data: CreateDepartamentoDto){
        const existe = await this.departamentoRepository.findOne({
            departamento: data.departamento,
            destino_id: data.destino_id
        });
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.departamentoRepository.create(data);
        return await this.departamentoRepository.save(nuevo)
    }

}
