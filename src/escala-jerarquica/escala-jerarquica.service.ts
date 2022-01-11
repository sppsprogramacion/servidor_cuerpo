import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EscalaJerarquica } from 'src/escala-jerarquica/entities/escala-jerarquica.entity';
import { CreateEscalaJerarquicaDto } from './dto/create-escala-jerarquica.dto';
import { EditEscalaJerarquicaDto } from './dto/edit-escala-jerarquica.dto';

@Injectable()
export class EscalaJerarquicaService {
    constructor(
        @InjectRepository(EscalaJerarquica)
        private readonly escalaRepository: Repository<EscalaJerarquica>
    ){}

    /**
     * Servicio get que devuelve los registros de la tabla Sector
     */
     async getMany(){
        try {
           return await this.escalaRepository.find();
            
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
            return await this.escalaRepository.findOneOrFail(id);
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
    async editOne(id: number, data: EditEscalaJerarquicaDto){
        try {
            return this.escalaRepository.update(id, data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que crea un nuevo registro de la tabla Sector
     * @param data 
     * @returns 
     */
    async createOne(data: CreateEscalaJerarquicaDto){
        try {
            const auxiliar = await this.escalaRepository.findOne({escala_jerarquica: data.escala_jerarquica})
            if(auxiliar){
                throw new BadRequestException('Ya existe una escala con esta denominación');
            }
            const nuevo = this.escalaRepository.create(data);
            return await this.escalaRepository.save(nuevo);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
         
    }

    async deleteOne(id: number){
        try {
            const existe = await this.escalaRepository.findOne(id);
            if(!existe){
                throw new BadRequestException("La escala que intenta eliminar no existe");
                 }
            return await this.escalaRepository.remove(existe);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }



}
