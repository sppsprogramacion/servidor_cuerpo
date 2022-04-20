import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ascenso } from './entities/ascenso.entity';
import { EditAscensoDto } from './dto/edit-ascenso-dto';
import { CreateAscensoDto } from './dto/create-ascenso-dto';

@Injectable()
export class AscensoService {
    constructor(
        @InjectRepository(Ascenso)


        
        private readonly ascensoRepository: Repository<Ascenso>
    ){}

     /**
     * Servicio que retorna todos los registros de la tabla ASCENSO
     * @returns 
     */
      async getAll(){
        return await this.ascensoRepository.find();
    }

    /**
     * Servicio que retorna un registro de la tabla ASCENSO según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.ascensoRepository.findOneOrFail(id);
    }

    /**
     * Servicio que edita un registro de la tabla ASCENSO según id
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditAscensoDto){
        const respuesta = await this.ascensoRepository.update(id,data);
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
        const respuesta = await this.ascensoRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro Ascenso que desea eliminar");
        return await this.ascensoRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla ASCENSO
     * @param data 
     * @returns 
     */
     async createOne(data: CreateAscensoDto){
        try {
            const nuevo = this.ascensoRepository.create(data);
            return await this.ascensoRepository.save(nuevo);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
