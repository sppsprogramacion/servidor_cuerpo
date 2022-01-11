import { Controller, Get, ParseIntPipe, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { EditSectorDto } from './dto';

@Controller('sector')
export class SectorController {
    constructor(
        private readonly sectorService: SectorService
    ){}

    @Get()
    async getAll(){
        return await this.sectorService.getMany();
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.sectorService.getOne(id);
    }

    @Post()
    async create(
        @Body()
        data: CreateSectorDto
    ){
        return await this.sectorService.createOne(data);
    }

    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        data: EditSectorDto
    ){
        return await this.sectorService.editOne(id, data);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
        ){
            return await this.sectorService.deleteOne(id);
        }


}
