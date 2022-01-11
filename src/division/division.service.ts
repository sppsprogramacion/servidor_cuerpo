import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Division } from './entities/division.entity';
import { Repository } from 'typeorm';
import { EditDivisionDto } from './dto/edit-division.dto';
import { CreateDivisionDto } from './dto/create-division.dto';

@Injectable()
export class DivisionService {

    constructor(
    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>
    ) {}

    /**
     * Servicio que retorna todos los registros de la tabla DIVISION
     * @returns 
     */
     async getAll(){
        return await this.divisionRepository.find();
    }

    /**
     * Servicio que retorna un registro de la tabla DIVISION según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.divisionRepository.findOneOrFail(id);
    }

    /**
     * Servicio que edita un registro
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditDivisionDto){
        const respuesta = await this.divisionRepository.update(id,data);
        if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro División que intenta modificar");
        return respuesta;
    }

    /**
     * Servicio que elimina un registro de la tabla DIVISION según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
     async deleteOne(id: number){
        const respuesta = await this.divisionRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro DIVISION que desea eliminar");
        return await this.divisionRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla SEXO
     * @param data 
     * @returns 
     */
     async createOne(data: CreateDivisionDto){
        const existe = await this.divisionRepository.findOne({
            division: data.division,
            departamento_id: data.departamento_id
        });
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.divisionRepository.create(data);
        return await this.divisionRepository.save(nuevo)
    }




}
