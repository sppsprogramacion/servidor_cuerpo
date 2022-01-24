import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TrasladoService } from './traslado.service';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { EditTrasladoDto } from './dto/edit-traslado.dto';
import { get } from 'http';
import { isInt, IsString } from 'class-validator';

@Controller('traslado')
export class TrasladoController {
    constructor(
        private readonly trasladoService: TrasladoService
    ){}

    @Get()
    async getAll(){
        return await this.trasladoService.getAll();
    }
    
    @Get('/legajo/:legajo')
    async getTrasladosXLegajo(        
        @Param('legajo')
        legajo: string
    ){
        let legajox:number=0;
        if(typeof legajo==='number' && (legajo%1)===0) {
            legajox = parseInt(legajo);
        }
        
        else{
            throw new NotFoundException('Debe proporcionar un valor entero para el Legajo');
        }       
        
        console.log("traslado en servicio", legajo);
        console.log("traslado en servicio legajox", legajox);
        return await this.trasladoService.getTrasladosXLegajo(legajox);
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
