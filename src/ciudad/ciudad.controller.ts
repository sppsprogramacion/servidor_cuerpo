import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto, EditCiudadDto } from './dto';

@Controller('ciudad')
export class CiudadController {
    constructor(
        private readonly ciudadService: CiudadService
    ){}

     /**
     * Petición http que lista todos los registros
     * @returns 
     */
      @Get()
      async getAll(){
          return await this.ciudadService.getAll();
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
        return await this.ciudadService.getOne(id);
    }

    /**
     * Petición http que crea un nuevo registro
     * @param data 
     * @returns 
     */
     @Post()
     async create(
         @Body()
         data: CreateCiudadDto
     ){
         return await this.ciudadService.createOne(data);
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
        data: EditCiudadDto
    ){
        return await this.ciudadService.editOne(id, data);
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
          return await this.ciudadService.deleteOne(id);
      }

}
