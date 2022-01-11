import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { EditEstadoCivilDto } from './dto/edit-estado-civil.dto';

@Controller('estado-civil')
export class EstadoCivilController {
    constructor(
        private readonly estadoService: EstadoCivilService
    ){}

     /**
     * Petición http que lista todos los registros
     * @returns 
     */
      @Get()
      async getAll(){
          return await this.estadoService.getAll();
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
        return await this.estadoService.getOne(id);
    }

    /**
     * Petición http que crea un nuevo registro
     * @param data 
     * @returns 
     */
     @Post()
     async create(
         @Body()
         data: CreateEstadoCivilDto
     ){
         return await this.estadoService.createOne(data);
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
        data: EditEstadoCivilDto
    ){
        return await this.estadoService.editOne(id, data);
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
          return await this.estadoService.deleteOne(id);
      }

}
