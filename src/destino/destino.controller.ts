import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DestinoService } from './destino.service';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { EditDestinoDto } from './dto/edit-destino.dto';

@Controller('destino')
export class DestinoController {
    constructor(
        private readonly destinoService: DestinoService
    ){}

    /**
     * Petición http que lista todos los registros
     * @returns 
     */
     @Get()
     async getAll(){
         return await this.destinoService.getAll();
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
         return await this.destinoService.getOne(id);
     }

     /**
     * Petición http que crea un nuevo registro
     * @param data 
     * @returns 
     */
    @Post()
    async create(
        @Body()
        data: CreateDestinoDto
    ){
        return await this.destinoService.createOne(data);
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
         data: EditDestinoDto
     ){
         return await this.destinoService.editOne(id, data);
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
        return await this.destinoService.deleteOne(id);
    }



     
}
