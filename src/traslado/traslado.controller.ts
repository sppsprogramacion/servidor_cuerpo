import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TrasladoService } from './traslado.service';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { EditTrasladoDto } from './dto/edit-traslado.dto';
import { get } from 'http';


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
        legajo: number
    ){        
        let legajox:number=0;
        
        if(Number.isInteger(legajo)){
            legajox = legajo;
        }
        else{
            throw new NotFoundException('Debe proporcionar un numero entero para el Legajo');
        }    
                
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

    @Put('/quitar/:legajo')
    async quitarTrasladoVigente(
        @Param('legajo', ParseIntPipe)
        legajo: number,
        @Body()
        data: EditTrasladoDto
    ){
        return await this.trasladoService.quitarTrasladoVigente(legajo, data);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
        ){
            return await this.trasladoService.deleteOne(id);
        }


}
