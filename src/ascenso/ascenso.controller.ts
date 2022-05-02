import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { Personal } from 'src/personal/entities/personal.entity';
import { PersonalService } from 'src/personal/personal.service';
import { AscensoService } from './ascenso.service';
import { CreateAscensoDto } from './dto/create-ascenso-dto';
import { EditAscensoDto } from './dto/edit-ascenso-dto';
import { Ascenso } from './entities/ascenso.entity';
import {Request} from 'express';
import * as request from 'supertest';

@Controller('ascenso')
export class AscensoController {
    constructor(
        private readonly ascensoService: AscensoService,
        private readonly personalService: PersonalService
    ){}

        /**
     * Petición http que lista todos los registros
     * @returns 
     */
    @Get()
    async getAll(){
        return await this.ascensoService.getAll();
    }
    //..................................................


      /**
     * Petición http que devuelve un registro según id
     * @param id 
     * @returns 
     */
    @Get(':id')
    async getOne(
        @Param('id',ParseIntPipe)
        id: number
    ){
        return await this.ascensoService.getOne(id);
    }
    //..........................................................

    /**
     * Petición http que crea un nuevo registro
     * @param escala 
     * @param data 
     * @returns 
     */
    @Post()
    async create(   
        // @Param('id_escala') id_escala: string,  
        @Req()
        req: Request,  
        @Body()
        data: CreateAscensoDto

        
    ){
        if(req.query.id_escala === null){
            throw new Error('Debe proporcionar la escala jerarquica del personal');
        }
        const id_escala: number = parseInt(req.query.id_escala.toString());
        //LISTA DE ASCENSO PARA REORDENAR
        console.log("ascenso enviado", data);
        let ascenso_vigente: Partial<Ascenso> = new Ascenso;
        let ascenso_aux: Partial<Ascenso> = new Ascenso;
        let list_ascensos: Ascenso[] = [];
        let orden_actualizar: number=0;
        ascenso_vigente = await this.ascensoService.getAscensoVigenteXLegajo(data.legajo);
        if (ascenso_vigente){
            list_ascensos = await this.ascensoService.getAscensosVigentesReOrdenar(ascenso_vigente.orden, ascenso_vigente.grado_id, ascenso_vigente.escalafon_id);
            orden_actualizar = ascenso_vigente.orden;
            for (let ascenso of list_ascensos){
                console.log("ascenso", ascenso);
                //EDICION DE NUMERO DE ORDEN 
                ascenso_aux = {
                    orden: orden_actualizar,
                    anio_orden: data.anio_orden,
                    instrumento_orden: data.instrumento_orden,
                    fecha_instrumento_orden: data.fecha_instrumento_orden
                }          
                const respuesta_orden = await this.ascensoService.editOne(ascenso.id_ascenso, ascenso_aux);
                //EDICION DE NUMERO DE ORDEN 
                orden_actualizar= orden_actualizar + 1
            }            
        }
        else{            
            let aux = await this.ascensoService.getAscensosXLegajo(data.legajo);
            if(aux[1] > 0){
                //throw new NotFoundException('No se encontro un ascenso vigente para este personal');
            }
            console.log("cantidad", aux[1]);
            console.log("lista ascensos", await this.ascensoService.getAscensosXLegajo(data.legajo));
            
        }
    
    
        //EDICION DE GRADO  EN EL PERSONAL
        let dataPersonal: Partial<Personal>= new Personal;
        dataPersonal = {
            grado_id: data.grado_id,
            escalafon_id: data.escalafon_id,
            escala_jerarquica_id: id_escala
        }        
        console.log("escala", id_escala);
        
        const respuesta_personal =  await this.personalService.editOneXLegajo(data.legajo,dataPersonal);
        //Fin EDICION DE GRADO  EN EL PERSONAL
        
        //EDICION DE CAMPO VIGENTE COMO FALSO EN TODOS LOS REGISTROS DE ASCENSO DE PERSONAL
        let data_aux: Partial<Ascenso>= new Ascenso;
        data_aux = {
            vigente:false
        }          
        const respuesta_traslado = await this.ascensoService.quitarAscensoVigente(data.legajo, data_aux);
        //fin EDICION DE CAMPO VIGENTE COMO FALSO EN TODOS LOS REGISTROS DE ASCENSO DE PERSONAL
    
        //GUARDAR NUEVO ASCENSO
        data.vigente=true;
        return await this.ascensoService.createOne(data);
    }
    //..................................................................................................

     /**
     * Petición http que edita un registro según id
     * @param id 
     * @param data 
     * @returns 
     */
    @Put(':id')
    async editOne(
        @Param('id',ParseIntPipe)
        id: number,
        @Body()
        data: EditAscensoDto
    ){
        return await this.ascensoService.editOne(id, data);
    }
    //....................................................................................

     /**
     * Petición http que elimina un registro según id
     * @param id 
     * @returns 
     */
    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.ascensoService.deleteOne(id);
    }
    //..............................................................................
}
