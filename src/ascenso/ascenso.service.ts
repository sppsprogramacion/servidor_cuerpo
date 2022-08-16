import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Ascenso } from './entities/ascenso.entity';
import { EditAscensoDto } from './dto/edit-ascenso-dto';
import { CreateAscensoDto } from './dto/create-ascenso-dto';
import { number } from 'joi';

@Injectable()
export class AscensoService {
    constructor(
        @InjectRepository(Ascenso)


        
        private readonly ascensoRepository: Repository<Ascenso>
    ){}

     /**
     * Servicio que retorna todos los registros de la tabla ASCENSO
     * @returns 
     */
      async getAll(){
        return await this.ascensoRepository.find();
    }

    /**
     * Servicio que retorna un registro de la tabla ASCENSO según ID
     * @param id 
     * @returns 
     */
     async getOne(id:number){
        return await this.ascensoRepository.findOneOrFail(id);
    }

    //ASCENSOS X LEGAJO
    async getAscensosXLegajo(legajox: number){
        try {
           return await this.ascensoRepository.findAndCount({
            where: [{legajo: legajox}],
            order:{
                id_ascenso: "DESC"
            }
        });
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    //FIN ASCENSOS X LEGAJO.......................................................

    //ASCENSO VIGENTE X LEGAJO
    async getAscensoVigenteXLegajo(legajox: number){
        try {
            return await this.ascensoRepository.findOne({
                    where: [{legajo: legajox, vigente: true}]
                });
            // if(!existe){
            //     throw new Error('No se encontro un traslado vigente');
            // }
            //return await this.trasladoRepository.findOneOrFail({legajo: legajox});

        } catch (error) {
            throw new BadRequestException(error.message);
        }

        
    }
    //FIN ASCENSO VIGENTE X LEGAJO.......................................................

    //ASCENSO VIGENTE X FECHA
    async getAscensoVigenteXFecha(fecha_ascensox: Date){
        try {
            return await this.ascensoRepository.findAndCount({
                    where: [{fecha_ascenso: fecha_ascensox, vigente: true}]
                });
            // if(!existe){
            //     throw new Error('No se encontro un traslado vigente');
            // }
            //return await this.trasladoRepository.findOneOrFail({legajo: legajox});

        } catch (error) {
            throw new BadRequestException(error.message);
        }

        
    }
    //FIN ASCENSO VIGENTE X LEGAJO.......................................................

    //ASCENSO VIGENTE X LEGAJO
    async getAscensosVigentesReOrdenar(ordenx: number, gradox: number, escalafonx: number){
        try {
            return await this.ascensoRepository.find({
                    where: [
                        {grado_id: gradox, orden: MoreThan (ordenx), escalafon_id: escalafonx,vigente:true}
                    ],
                    order:{
                        orden: "ASC"
                    }

                });
            // if(!existe){
            //     throw new Error('No se encontro un traslado vigente');
            // }
            //return await this.trasladoRepository.findOneOrFail({legajo: legajox});

        } catch (error) {
            throw new BadRequestException(error.message);
        }

        
    }
    //FIN ASCENSO VIGENTE X LEGAJO.......................................................

    /**
     * Servicio que edita un registro de la tabla ASCENSO según id
     * @param id 
     * @param data 
     * @returns 
     */
    async editOne(id: number, data: EditAscensoDto){
        const respuesta = await this.ascensoRepository.update(id,data);
        if((await respuesta).affected == 0) throw new NotFoundException("No existe el registro de Ciudad que intenta modificar");
        return respuesta;
    }
    //.........................................................................

    //QUITAR ASCENSO VIGENTE
    async quitarAscensoVigente(legajox: number, data: EditAscensoDto){        

        try {
            const cantidad = await this.ascensoRepository.count({legajo:legajox});
            const respuesta = await this.ascensoRepository.update({legajo:legajox},data);
            if (cantidad > 0 && respuesta.affected == 0) throw new NotFoundException('Error: No se ha quitado el estado vigente en ascensos anteriores')
            
            return respuesta;
            
        } catch (error) {
              throw new BadRequestException(error.message);
        }                 

        
    }
    //FIN QUITAR ASCENSO VIGENTE
    
    /**
     * Servicio que elimina un registro de la tabla SEXO según id
     * se utiliza remove y no delete porque solo el primero activa triggers
     * @param id 
     * @returns 
     */
     async deleteOne(id: number){
        const respuesta = await this.ascensoRepository.findOne(id);
        if(!respuesta) throw new NotFoundException("No existe el registro Ascenso que desea eliminar");
        return await this.ascensoRepository.remove(respuesta);        
    }

    /**
     * Servicio que crea un nuevo registro de la tabla ASCENSO
     * @param data 
     * @returns 
     */
     async createOne(data: CreateAscensoDto){
        try {
            const nuevo = this.ascensoRepository.create(data);
            return await this.ascensoRepository.save(nuevo);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
