import { Body, Controller, Delete, Get, Param, ParseIntPipe,Post, Put } from '@nestjs/common';
import { SituacionService } from './situacion.service';
import { CreateSituacionDto } from './dto/create-situacion.dto';
import { EditSituacionDto } from './dto/edit-situacion.dto';

@Controller('situacion')
export class SituacionController {
    constructor(
        private readonly situacionService: SituacionService
    ){}

    @Get()
    async getAll(){
        return await this.situacionService.getAll();
    }

    @Get(':id')
    async getOne(
        @Param('id',ParseIntPipe)
        id: number
    ){
        return await this.situacionService.getOne(id);
    }

    @Post()
    async create(
        @Body()
        situacionDto: CreateSituacionDto
    ){
        console.log('EL BODY LLEVA', situacionDto);
        return await this.situacionService.createOne(situacionDto);
    }

    @Put(':id')
    async editOne(
        @Param('id',ParseIntPipe)
        id:number,
        @Body()
        data: EditSituacionDto
    ){
        return await this.situacionService.editOne(id,data);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id',ParseIntPipe)
        id: number
    ){
        return await this.situacionService.deleteOne(id);
    }

}
