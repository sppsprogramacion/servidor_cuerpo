import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TrasladoService } from './traslado.service';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { EditTrasladoDto } from './dto/edit-traslado.dto';

@Controller('traslado')
export class TrasladoController {
    constructor(
        private readonly trasladoService: TrasladoService
    ){}

    @Get()
    async getAll(){
        return await this.trasladoService.getMany();
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.trasladoService.getOne(id);
    }

    @Post()
    async create(
        @Body()
        data: CreateTrasladoDto
    ){
        return await this.trasladoService.createOne(data);
    }

    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        data: EditTrasladoDto
    ){
        return await this.trasladoService.editOne(id, data);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
        ){
            return await this.trasladoService.deleteOne(id);
        }


}
