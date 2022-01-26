import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalFuncion } from './entities/personal-funcion.entity';
import { EditPersonalDto } from '../personal/dto/edit-personal.dto';
import { EditPersonalFuncionDto } from './dto/edit-personal-funcion.dto';
import { CreatePersonalFuncionDto } from './dto/create-personal-funcion.dto';

@Injectable()
export class PersonalFuncionService {
    constructor(
        @InjectRepository(PersonalFuncion)
        private readonly personalFuncionRepository: Repository<PersonalFuncion>
    ){}

    /**
     * Servicio get que devuelve los registros de la tabla Sector
     */
    async getAll(){
        try {
           return await this.personalFuncionRepository.find({
            order:{
                fecha: "ASC"
            }
        });
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getFuncionesXLegajo(legajox: number){
        try {
           return await this.personalFuncionRepository.findAndCount({
            where: [{legajo: legajox}],
            order:{
                id_personal_funcion: "DESC"
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
            const existe = await this.personalFuncionRepository.findOne(id);
            if(!existe){
                throw new Error('No Existe el registro buscado');
            }
            return await this.personalFuncionRepository.findOneOrFail(id);
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
    async editOne(id: number, data: EditPersonalFuncionDto){
        try {
            //return this.trasladoRepository.update(id, data);
            return this.personalFuncionRepository.update(id, data);
        } catch (error) {
              throw new BadRequestException(error.message);
        }
    }

    //QUITAR FUNCION VIGENTE
    async quitarFuncionVigente(legajox: number, data: EditPersonalFuncionDto){
        try {
            return this.personalFuncionRepository.update({legajo:legajox},data)

        } catch (error) {
              throw new BadRequestException(error.message);
        }
    }
    //FIN QUITAR FUNCION VIGENTE

    /**
     * Servicio que crea un nuevo registro de la tabla Sector
     * @param data 
     * @returns 
     */
    async createOne(data: CreatePersonalFuncionDto){
        try {
            // const auxiliar = await this.trasladoRepository.findOne({where: [{sector: data.sector}]})
            // if(auxiliar){
            //     throw new BadRequestException('Ya existe un sector con esta denominación');
            // }
            const nuevo = this.personalFuncionRepository.create(data);
            return await this.personalFuncionRepository.save(nuevo);
        } catch (error) {
            }
    }

    async deleteOne(id: number){
        try {
            const existe = await this.personalFuncionRepository.findOne(id);
            if(!existe){
                throw new BadRequestException("El usuario que intenta eliminar no existe");
                 }
            return await this.personalFuncionRepository.remove(existe);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
