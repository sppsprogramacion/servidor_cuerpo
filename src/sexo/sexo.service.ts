import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sexo } from './entities/sexo.entity';
import { Repository } from 'typeorm';
import { EditSexoDto } from './dto/edit-sexo.dto';
import { CreateSexoDto } from './dto/create-sexo.dto';

@Injectable()
export class SexoService {
    constructor(
        @InjectRepository(Sexo)
        private readonly sexoRepository: Repository<Sexo>
    ){ }

    /**
     * Servicio que retorna todos los registros de la tabla SEXO
     * @returns 
     */
    async getAll(){
        try {
            return await this.sexoRepository.find();
             } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que retorna un registro de la tabla SEXO según ID
     * @param id 
     * @returns 
     */
    async getOne(id:number){
        try {
            return await this.sexoRepository.findOneOrFail(id);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async editOne(id: number, data: EditSexoDto){
        try {
            const existe = await this.sexoRepository.findOne({sexo: data.sexo});
            if(existe){
                throw new Error('El registro que desea crear/editar ya existe');
            }
            const respuesta = await this.sexoRepository.update(id,data);
            if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro de Sexo que intenta modificar");
            return respuesta;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * Servicio que elimina un registro de la tabla SEXO según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
    async deleteOne(id: number){
        const respuesta = await this.sexoRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro SEXO que desea eliminar");
        return await this.sexoRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla SEXO
     * @param data 
     * @returns 
     */
    async createOne(data: CreateSexoDto){
        const existe = await this.sexoRepository.findOne({sexo: data.sexo});
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.sexoRepository.create(data);
        return await this.sexoRepository.save(nuevo)
    }


}
