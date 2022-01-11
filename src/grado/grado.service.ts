import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grado } from './entities/grado.entity';
import { Repository } from 'typeorm';
import { EditGradoDto } from './dto/edit-grado.dto';
import { CreateGradoDto } from './dto/create-grado.dto';

@Injectable()
export class GradoService {
    constructor(
        @InjectRepository(Grado)
        private readonly gradoRepository: Repository<Grado>
    ){}

    
    /**
     * Servicio get que devuelve los registros de la tabla Sector
     */
     async getAll(){
        try {
           return await this.gradoRepository.find();
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * servicio que devuelve un registro según id
     * @param id 
     */
    async getOne(id: number){
        try {
            return await this.gradoRepository.findOneOrFail(id);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que edita los datos de un registro de la tabla Sector
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditGradoDto){
        try {
            return this.gradoRepository.update(id, data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que crea un nuevo registro de la tabla Sector
     * @param data 
     * @returns 
     */
    async createOne(data: CreateGradoDto){
        try {
            const auxiliar = await this.gradoRepository.findOne({grado: data.grado})
            if(auxiliar){
                throw new BadRequestException('Ya existe un grado con esta denominación');
            }
            const nuevo = this.gradoRepository.create(data);
            return await this.gradoRepository.save(nuevo);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
         
    }

    async deleteOne(id: number){
        try {
            const existe = await this.gradoRepository.findOne(id);
            if(!existe){
                throw new BadRequestException("El grado que intenta eliminar no existe");
                 }
            return await this.gradoRepository.remove(existe);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


}
