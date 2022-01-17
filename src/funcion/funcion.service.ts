import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionDto, EditFuncionDto } from './dto';
import { Funcion } from './entities/funcion.entity';

@Injectable()
export class FuncionService {

    
    constructor(
        @InjectRepository(Funcion)
        private readonly funcionRepository: Repository<Funcion>
        ) {}
    
        /**
         * Servicio que retorna todos los registros de la tabla DIVISION
         * @returns 
         */
         async getAll(){
            return await this.funcionRepository.find({
                order:{
                    funcion: "ASC"
                }
            });
        }
    
        /**
         * Servicio que retorna un registro de la tabla DIVISION según ID
         * @param id 
         * @returns 
         */
         async getOne(id:number){
            return await this.funcionRepository.findOneOrFail(id);
        }
    
        /**
         * Servicio que edita un registro
         * @param id 
         * @param data 
         * @returns 
         */
        async editOne(id: number, data: EditFuncionDto){
            const respuesta = await this.funcionRepository.update(id,data);
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
            const respuesta = await this.funcionRepository.findOne(id);
            if(!respuesta) throw new NotFoundException("No existe el registro DIVISION que desea eliminar");
            return await this.funcionRepository.remove(respuesta);        
        }
    
        /**
         * Servicio que crea un nuevo registro de la tabla SEXO
         * @param data 
         * @returns 
         */
         async createOne(data: CreateFuncionDto){
            const existe = await this.funcionRepository.findOne({
                funcion: data.funcion
            });
            if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
            const nuevo = this.funcionRepository.create(data);
            return await this.funcionRepository.save(nuevo)
        }
    
}
