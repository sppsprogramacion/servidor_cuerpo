import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jerarquia } from './entities/jerarquia.entity';
import { Repository } from 'typeorm';
import { CreateJerarquiaDto, EditJerarquiaDto } from './dto';


@Injectable()
export class JerarquiaService {
    constructor(
        @InjectRepository(Jerarquia)
        private readonly jerarquiaRepository: Repository<Jerarquia>
    ){}

    
    /**
     * Servicio get que devuelve los registros de la tabla Jerarquia
     */
     async getAll(){
        try {
           return await this.jerarquiaRepository.find()
            
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
            return await this.jerarquiaRepository.findOneOrFail(id);
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
    async editOne(id: number, data: EditJerarquiaDto){
        try {
            const existe = await this.jerarquiaRepository.findOne({jerarquia: data.jerarquia});
            if(existe){
                throw new Error('El registro que desea crear/editar ya existe');
            }
            return this.jerarquiaRepository.update(id, data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que crea un nuevo registro de la tabla Jerarquia
     * @param data 
     * @returns 
     */
    async createOne(data: CreateJerarquiaDto){
        try {
            const auxiliar = await this.jerarquiaRepository.findOne({jerarquia: data.jerarquia})
            if(auxiliar){
                throw new BadRequestException('Ya existe una jerarquia con esta denominación');
            }
            const nuevo = this.jerarquiaRepository.create(data);
            return await this.jerarquiaRepository.save(nuevo);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
         
    }

    async deleteOne(id: number){
        try {
            const existe = await this.jerarquiaRepository.findOne(id);
            if(!existe){
                throw new BadRequestException("La jerarquia que intenta eliminar no existe");
                 }
            return await this.jerarquiaRepository.remove(existe);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


}
