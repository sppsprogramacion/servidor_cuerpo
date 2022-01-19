import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditTrasladoDto } from './dto';
import { Traslado } from './entities/traslado.entity';
import { CreateTrasladoDto } from './dto/create-traslado.dto';

@Injectable()
export class TrasladoService {
    constructor(
        @InjectRepository(Traslado)
        private readonly trasladoRepository: Repository<Traslado>
    ){}

    /**
     * Servicio get que devuelve los registros de la tabla Sector
     */
    async getMany(){
        try {
           return await this.trasladoRepository.find({
            order:{
                fecha: "ASC"
            }
        });
            
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
            const existe = await this.trasladoRepository.findOne(id);
            if(!existe){
                throw new Error('No Existe el registro buscado');
            }
            return await this.trasladoRepository.findOneOrFail(id);
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
    async editOne(id: number, data: EditTrasladoDto){
        try {
            return this.trasladoRepository.update(id, data);
        } catch (error) {
              throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que crea un nuevo registro de la tabla Sector
     * @param data 
     * @returns 
     */
    async createOne(data: CreateTrasladoDto){
        try {
            // const auxiliar = await this.trasladoRepository.findOne({where: [{sector: data.sector}]})
            // if(auxiliar){
            //     throw new BadRequestException('Ya existe un sector con esta denominación');
            // }
            const nuevo = this.trasladoRepository.create(data);
            return await this.trasladoRepository.save(nuevo);
        } catch (error) {
            }
    }

    async deleteOne(id: number){
        try {
            const existe = await this.trasladoRepository.findOne(id);
            if(!existe){
                throw new BadRequestException("El usuario que intenta eliminar no existe");
                 }
            return await this.trasladoRepository.remove(existe);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
