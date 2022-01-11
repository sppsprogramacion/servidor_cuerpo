import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DepartamentoProvincialService } from './departamento-provincial.service';

import { CreateDptoProvDto } from './dto/create-dpto-prov.dto';
import { EditDptoProvDto } from './dto/edit-dpto-prov.dto';

@Controller('departamento-provincial')
export class DepartamentoProvincialController {
    constructor(
        private readonly dptoProvService: DepartamentoProvincialService
    ){}

     /**
     * Petición http que lista todos los registros
     * @returns 
     */
      @Get()
      async getAll(){
          return await this.dptoProvService.getAll();
      }

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
        return await this.dptoProvService.getOne(id);
    }

    /**
     * Petición http que crea un nuevo registro
     * @param data 
     * @returns 
     */
     @Post()
     async create(
         @Body()
         data: CreateDptoProvDto
     ){
         return await this.dptoProvService.createOne(data);
     }

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
        data: EditDptoProvDto
    ){
        return await this.dptoProvService.editOne(id, data);
    }

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
          return await this.dptoProvService.deleteOne(id);
      }

}
