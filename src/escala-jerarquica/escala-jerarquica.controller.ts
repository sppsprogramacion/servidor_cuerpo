import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EscalaJerarquicaService } from './escala-jerarquica.service';
import { CreateEscalaJerarquicaDto } from './dto/create-escala-jerarquica.dto';
import { EditEscalaJerarquicaDto } from './dto/edit-escala-jerarquica.dto';

@Controller('escala-jerarquica')
export class EscalaJerarquicaController {
    constructor(
        private readonly escalaService: EscalaJerarquicaService
    ){}

    /**
     * Listado de todos los registros de Escala Jerarquica
     * @returns 
     */
     @Get()
     async getAll(){
         return await this.escalaService.getMany()
     }
 
     /**
      * Peticion http que retoran un registro Escala Jerarquica segun id
      * @param id 
      * @returns 
      */
     @Get(':id')
     async getOne(
         @Param('id', ParseIntPipe)
         id: number
     ){
         return await this.escalaService.getOne(id);
     }
 
     /**
      * Peticion http que crea un registro nuevo de Escala Jerarquica
      * @param data 
      * @returns 
      */
     @Post()
     async create(
         @Body()
         data: CreateEscalaJerarquicaDto
     ){
         return await this.escalaService.createOne(data);
     }
 
     /**
      * Petición http que edita un registro de Escala Jerarquica
      * @param id 
      * @param data 
      * @returns 
      */
     @Put(':id')
     async editOne(
         @Param('id', ParseIntPipe)
         id: number,
         @Body()
         data: EditEscalaJerarquicaDto
     ){
         return await this.escalaService.editOne(id, data);
     }
 
     /**
      * Petición http que elimina un registro de Escala Jerarquica
      * @param id 
      * @returns 
      */
     @Delete(':id')
     async deleteOne(
         @Param('id', ParseIntPipe)
         id: number
     ){
         return await this.escalaService.deleteOne(id);
     }
 
 



}
