import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './entities/sector.entity';
import { EditSectorDto } from './dto/edit-sector.dto';
import { CreateSectorDto } from './dto/create-sector.dto';

@Injectable()
export class SectorService {

    constructor(
        @InjectRepository(Sector)
        private readonly sectorRepository: Repository<Sector>
    ){}

    /**
     * Servicio get que devuelve los registros de la tabla Sector
     */
    async getMany(){
        try {
           return await this.sectorRepository.find();
            
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
            const existe = await this.sectorRepository.findOne(id);
            if(!existe){
                throw new Error('No Existe el registro buscado');
            }
            return await this.sectorRepository.findOneOrFail(id);
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
    async editOne(id: number, data: EditSectorDto){
        try {
            return this.sectorRepository.update(id, data);
        } catch (error) {
              throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que crea un nuevo registro de la tabla Sector
     * @param data 
     * @returns 
     */
    async createOne(data: CreateSectorDto){
        try {
            const auxiliar = await this.sectorRepository.findOne({where: [{sector: data.sector}]})
            if(auxiliar){
                throw new BadRequestException('Ya existe un sector con esta denominación');
            }
            const nuevo = this.sectorRepository.create(data);
            return await this.sectorRepository.save(nuevo);
        } catch (error) {
            }
    }

    async deleteOne(id: number){
        try {
            const existe = await this.sectorRepository.findOne(id);
            if(!existe){
                throw new BadRequestException("El usuario que intenta eliminar no existe");
                 }
            return await this.sectorRepository.remove(existe);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


}
