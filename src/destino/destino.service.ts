import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destino } from './entities/destino.entity';
import { Repository } from 'typeorm';
import { EditDestinoDto } from './dto/edit-destino.dto';
import { CreateDestinoDto } from './dto/create-destino.dto';

@Injectable()
export class DestinoService {
    constructor(
        @InjectRepository(Destino)
        private readonly destinoRepository: Repository<Destino>
    ){}

     /**
     * Servicio que retorna todos los registros de la tabla Destino
     * @returns 
     */
      async getAll(){
        return await this.destinoRepository.find();
    }

    /**
     * Servicio que retorna un registro de la tabla DESTINO según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.destinoRepository.findOneOrFail(id);
    }

    /**
     * Servicio que edita un registro según Id
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditDestinoDto){
        const respuesta = await this.destinoRepository.update(id,data);
        if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro de Sexo que intenta modificar");
        return respuesta;
    }

    /**
     * Servicio que elimina un registro de la tabla Destino según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
     async deleteOne(id: number){
        const respuesta = await this.destinoRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro SEXO que desea eliminar");
        return await this.destinoRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla DESTINO
     * @param data 
     * @returns 
     */
     async createOne(data: CreateDestinoDto){
        const existe = await this.destinoRepository.findOne({destino: data.destino});
        if(existe) throw new BadRequestException("El registro que intenta crear ya existe");
        const nuevo = this.destinoRepository.create(data);
        return await this.destinoRepository.save(nuevo)
    }



}
