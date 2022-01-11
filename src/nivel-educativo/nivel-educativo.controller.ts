import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { NivelEducativoService } from './nivel-educativo.service';
import { EditNivelEducativoDto } from './dto/edit-nivel-educativo.dto';
import { CreateNivelEducativoDto } from './dto/create-nivel-educativo.dto';

@Controller('nivel-educativo')
export class NivelEducativoController {
    constructor(
        private readonly nivelService: NivelEducativoService
    ){}

    
    /**
     * Listado de todos los registros de Escala Jerarquica
     * @returns 
     */
     @Get()
     async getAll(){
        return await this.nivelService.getAll()
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
        return await this.nivelService.getOne(id);
     }
 
     /**
      * Peticion http que crea un registro nuevo de Escala Jerarquica
      * @param data 
      * @returns 
      */
     @Post()
     async create(
         @Body()
         data: CreateNivelEducativoDto
     ){
         return await this.nivelService.createOne(data);
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
         data: EditNivelEducativoDto
     ){
         return await this.nivelService.editOne(id, data);
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
         return await this.nivelService.deleteOne(id);
     }
 
 





}
