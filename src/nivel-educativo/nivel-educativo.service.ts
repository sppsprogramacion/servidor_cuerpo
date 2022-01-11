import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelEducativo } from './entities/nivel-educativo.entity';
import { Repository } from 'typeorm';
import { CreateNivelEducativoDto } from './dto/create-nivel-educativo.dto';
import { EditNivelEducativoDto } from './dto/edit-nivel-educativo.dto';

@Injectable()
export class NivelEducativoService {
    constructor(
        @InjectRepository(NivelEducativo)
        private readonly nivelRepository: Repository<NivelEducativo>
    ){}


    /**
     * Servicio get que devuelve los registros de la tabla Jerarquia
     */
     async getAll(){
        try {
           return await this.nivelRepository.find()
            
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
            return await this.nivelRepository.findOneOrFail(id);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que edita los datos de un registro de la tabla Jerarquia
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditNivelEducativoDto){
        try {
            const existe = await this.nivelRepository.findOne({nivel_educativo: data.nivel_educativo});
            if(existe){
                throw new Error('El registro que desea crear/editar ya existe');
            }
            return this.nivelRepository.update(id, data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que crea un nuevo registro de la tabla Jerarquia
     * @param data 
     * @returns 
     */
    async createOne(data: CreateNivelEducativoDto){
        try {
            const auxiliar = await this.nivelRepository.findOne({nivel_educativo: data.nivel_educativo})
            if(auxiliar){
                throw new BadRequestException('Ya existe una jerarquia con esta denominación');
            }
            const nuevo = this.nivelRepository.create(data);
            return await this.nivelRepository.save(nuevo);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
         
    }

    async deleteOne(id: number){
        try {
            const existe = await this.nivelRepository.findOne(id);
            if(!existe){
                throw new BadRequestException("La jerarquia que intenta eliminar no existe");
                 }
            return await this.nivelRepository.remove(existe);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
