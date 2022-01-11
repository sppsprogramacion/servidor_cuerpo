import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GradoService } from './grado.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { EditGradoDto } from './dto';

@Controller('grado')
export class GradoController {
    constructor(
        private readonly gradoService: GradoService
    ){}


    /**
     * Listado de todos los registros de Grado
     * @returns 
     */
     @Get()
     async getAll(){
         return await this.gradoService.getAll()
     }
 
     /**
      * Peticion http que retorna un registro Grado segun id
      * @param id 
      * @returns 
      */
     @Get(':id')
     async getOne(
         @Param('id', ParseIntPipe)
         id: number
     ){
         return await this.gradoService.getOne(id);
     }
 
     /**
      * Peticion http que crea un registro nuevo de Escala Jerarquica
      * @param data 
      * @returns 
      */
     @Post()
     async create(
         @Body()
         data: CreateGradoDto
     ){
         return await this.gradoService.createOne(data);
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
         data: EditGradoDto
     ){
         return await this.gradoService.editOne(id, data);
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
         return await this.gradoService.deleteOne(id);
     }
 
 




}
