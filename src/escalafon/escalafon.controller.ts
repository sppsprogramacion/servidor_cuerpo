import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EscalafonService } from './escalafon.service';
import { CreateEscalafonDto } from './dto/create-escalafon.dto';
import { EditEscalafonDto } from './dto/edit-escalafon.dto';

@Controller('escalafon')
export class EscalafonController {

    constructor(
        private readonly escalafonService: EscalafonService
    ){}


    /**
     * Listado de todos los registros de Escalafon
     * @returns 
     */
    @Get()
    async getAll(){
        return await this.escalafonService.getAll()
    }

    /**
     * Peticion http que retoran un registro escalafon segun id
     * @param id 
     * @returns 
     */
    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.escalafonService.getOne(id);
    }

    /**
     * Peticion http que crea un registro nuevo de Escalafon
     * @param data 
     * @returns 
     */
    @Post()
    async create(
        @Body()
        data: CreateEscalafonDto
    ){
        return await this.escalafonService.createOne(data);
    }

    /**
     * Petición http que edita un registro de Escalafon
     * @param id 
     * @param data 
     * @returns 
     */
    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        data: EditEscalafonDto
    ){
        return await this.escalafonService.editOne(id, data);
    }

    /**
     * Petición http que elimina un registro de Escalafón
     * @param id 
     * @returns 
     */
    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.escalafonService.deleteOne(id);
    }


}
