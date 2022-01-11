import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { JerarquiaService } from './jerarquia.service';
import { EditJerarquiaDto, CreateJerarquiaDto } from './dto';


@Controller('jerarquia')
export class JerarquiaController {
    constructor(
        private readonly jerarquiaService: JerarquiaService
    ){}


    /**
     * Listado de todos los registros de Jerarquia
     * @returns 
     */
     @Get()
     async getAll(){
         return await this.jerarquiaService.getAll()
     }
 
     /**
      * Peticion http que retoran un registro Jerarquia segun id
      * @param id 
      * @returns 
      */
     @Get(':id')
     async getOne(
         @Param('id', ParseIntPipe)
         id: number
     ){
         return await this.jerarquiaService.getOne(id);
     }
 
     /**
      * Peticion http que crea un registro nuevo de Jerarquia
      * @param data 
      * @returns 
      */
     @Post()
     async create(
         @Body()
         data: CreateJerarquiaDto
     ){
         return await this.jerarquiaService.createOne(data);
     }
 
     /**
      * Petición http que edita un registro de Jerarquia
      * @param id 
      * @param data 
      * @returns 
      */
     @Put(':id')
     async editOne(
         @Param('id', ParseIntPipe)
         id: number,
         @Body()
         data: EditJerarquiaDto
     ){
         return await this.jerarquiaService.editOne(id, data);
     }
 
     /**
      * Petición http que elimina un registro de Jerarquia
      * @param id 
      * @returns 
      */
     @Delete(':id')
     async deleteOne(
         @Param('id', ParseIntPipe)
         id: number
     ){
         return await this.jerarquiaService.deleteOne(id);
     }
 
 }
