import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SeccionGuardiaService } from './seccion-guardia.service';
import { CreateSeccionGuardiaDto } from './dto/create-seccion-guardia.dto';
import { EditSeccionGuardiaDto } from './dto/edit-seccion-guardia.dto';

@Controller('seccion-guardia')
export class SeccionGuardiaController {
    constructor(
        private readonly seccionGuardiaService: SeccionGuardiaService
    ) {}

    /**
     * Petición http que lista todos los registros
     * @returns 
     */
    @Get()
    async getAll(){
        return await this.seccionGuardiaService.getAll();
    }

    /**
     * Petición http que devuelve un registro según id
     * @param id 
     * @returns 
     */
    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.seccionGuardiaService.getOne(id);
    }

    @Post()
    async create(
        @Body()
        data: CreateSeccionGuardiaDto
    ){
        return await this.seccionGuardiaService.createOne(data);

    }

    /**
     * Petición http que edita un registro según id
     * @param id 
     * @param data 
     * @returns 
     */
    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        data: EditSeccionGuardiaDto
    ){
        return await this.seccionGuardiaService.editOne(id,data);

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
         return await this.seccionGuardiaService.deleteOne(id);
     }

    

}
