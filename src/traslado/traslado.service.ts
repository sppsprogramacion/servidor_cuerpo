import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditTrasladoDto } from './dto';
import { Traslado } from './entities/traslado.entity';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { EditPersonalDto } from 'src/personal/dto';
import { Personal } from 'src/personal/entities/personal.entity';
import { PersonalService } from '../personal/personal.service';

@Injectable()
export class TrasladoService {
    constructor(
        @InjectRepository(Traslado)
        private readonly trasladoRepository: Repository<Traslado>,
        // @InjectRepository(Personal)
        //private readonly personalService:PersonalService
    ){}

    //LISTADO COMPLETO
    /**
     * Servicio get que devuelve los registros de la tabla Sector
     */
    async getAll(){
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
    //FIN LISTADO COMPLETO.....................................................

    //TRASLADO X LEGAJO
    async getTrasladosXLegajo(legajox: number){
        try {
           return await this.trasladoRepository.findAndCount({
            where: [{legajo: legajox}],
            order:{
                id_traslado: "DESC"
            }
        });
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    //FIN TRASLADO X LEGAJO.......................................................

    //LISTADO NUEVOS TRASLADO TODOS
    async getNuevosTrasladosTodos(){
        try {
           return await this.trasladoRepository.findAndCount({
            where: [{vigente: true, confirmado: false}],
            order:{
                id_traslado: "DESC"
            }
        });
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    //FIN LISTADO NUEVOS TRASLADO TODOS.......................................................

    //LISTADO NUEVOS TRASLADO X ORGANISMO
    async getNuevosTrasladosXOrganismo(id_organismo: number){
        try {
           return await this.trasladoRepository.findAndCount({
            where: [{destino_id: id_organismo, vigente: true, confirmado: false}],
            order:{
                id_traslado: "DESC"
            }
        });
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    //FIN LISTADO NUEVOS TRASLADO X ORGANISMO.......................................................

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
    //FIN TRASLADO X ID..............................................................

    //EDITAR UN TRASLADO
    /**
     * Servicio que edita los datos de un registro de la tabla Sector
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditTrasladoDto){
        try {
            //return this.trasladoRepository.update(id, data);
            return this.trasladoRepository.update(id, data);
        } catch (error) {
              throw new BadRequestException(error.message);
        }
    }
    //FIN EDITAR UN TRASLADO.......................................................

    //QUITAR TRASLADO VIGENTE
    async quitarTrasladoVigente(legajox: number, data: EditTrasladoDto){
        try {
            return this.trasladoRepository.update({legajo:legajox},data)

        } catch (error) {
              throw new BadRequestException(error.message);
        }
    }
    //FIN QUITAR TRASLADO VIGENTE


    //CREAR UN TRASLADO
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
    //FIN CREAR UN TRASLADO...........................................

    //BORRAR UN TRASLADO
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
    //FIN BORRAR UN TRASLADO............................................................


    // async editPersonal(legajox:number, data: EditPersonalDto){
    //     try {
    //         if(data.foto){
    //             throw new Error('La foto del personal  solo puede ser modificada por el servicio correspondiente!');
    //         }
                 
        
    //     const respuesta =  await this.personalRepository.update({legajo:legajox}, data);
        
    //     if (respuesta.affected == 0) throw new NotFoundException('Error: No se ha actualizado ningun registro')
    //     return respuesta;
            
    //     } catch (error) {
    //         throw new BadRequestException(error.message);
    //     }
                   
         
    // }

}
