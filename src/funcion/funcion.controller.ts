import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateFuncionDto, EditFuncionDto } from './dto';
import { FuncionService } from './funcion.service';

@Controller('funcion')
export class FuncionController {
    
    constructor(
        private readonly funcionService: FuncionService        
    ) {     
    }

    /**
     * Petición http que lista todos los registros
     * @returns 
     */
     @Get()
     async getAll(){
         return await this.funcionService.getAll();
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
        return await this.funcionService.getOne(id);
    }

    /**
     * Petición http que crea un nuevo registro
     * @param data 
     * @returns 
     */
     @Post()
     async create(
         @Body()
         data: CreateFuncionDto
     ){
         return await this.funcionService.createOne(data);
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
        data: EditFuncionDto
    ){
        return await this.funcionService.editOne(id, data);
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
         return await this.funcionService.deleteOne(id);
     }


}
