import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Escalafon } from './entities/escalafon.entity';
import { EditEscalafonDto } from './dto/edit-escalafon.dto';
import { CreateEscalafonDto } from './dto/create-escalafon.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EscalafonService {

    constructor(
        @InjectRepository(Escalafon)
        private readonly escalafonRepository: Repository<Escalafon>
    ){}


    /**
     * Servicio que devuelve todos los registros de la tabla escalafon
     * @returns 
     */
    async getAll(){
        try {
          return await this.escalafonRepository.find();  
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que devuelve un registro de escalafon segun id
     * @param id 
     * @returns 
     */
    async getOne(id: number){
        try {
            return await this.escalafonRepository.findOneOrFail(id);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que edita un registro escalafon según el Id
     * @param id 
     * @param data 
     */
    async editOne(id: number, data: EditEscalafonDto){
        try {
            const respuesta = await this.escalafonRepository.update(id, data);
            if((await respuesta).affected == 0) throw new Error('No se ha actualizado ningún Registro de Escalafón');
            return respuesta;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Servicio que crea un registro Escalafón
     * @param data 
     * @returns 
     */
    async createOne(data: CreateEscalafonDto){
        try {
            const existe = await this.escalafonRepository.findOne({escalafon: data.escalafon});
            if(existe){
                throw new Error('El escalafón que intenta crear ya existe');
            }else{
                const nuevo = await this.escalafonRepository.create(data); 
                return await this.escalafonRepository.save(nuevo);
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async deleteOne(id: number){
        try {
            const existe = await this.escalafonRepository.findOne(id);
            if(!existe){
                throw new Error('El registro que intenta eliminar no Existe');
            }else{
                return await this.escalafonRepository.remove(existe);
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
