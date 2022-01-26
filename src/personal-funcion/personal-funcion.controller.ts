import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PersonalFuncionService } from './personal-funcion.service';
import { CreatePersonalFuncionDto } from './dto/create-personal-funcion.dto';
import { EditPersonalFuncionDto } from './dto/edit-personal-funcion.dto';

@Controller('personal-funcion')
export class PersonalFuncionController {
    constructor(
        private readonly personalFuncionService: PersonalFuncionService
    ){}

    @Get()
    async getAll(){
        return await this.personalFuncionService.getAll();
    }
    
    @Get('/legajo/:legajo')
    async getFuncionesXLegajo(        
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
                
        return await this.personalFuncionService.getFuncionesXLegajo(legajox);
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.personalFuncionService.getOne(id);
    }

    @Post()
    async create(
        @Body()
        data: CreatePersonalFuncionDto
    ){
        return await this.personalFuncionService.createOne(data);
    }

    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        data: EditPersonalFuncionDto
    ){
        return await this.personalFuncionService.editOne(id, data);
    }

    @Put('/quitar/:legajo')
    async quitarTrasladoVigente(
        @Param('legajo', ParseIntPipe)
        legajo: number,
        @Body()
        data: EditPersonalFuncionDto
    ){
        return await this.personalFuncionService.quitarFuncionVigente(legajo, data);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
        ){
            return await this.personalFuncionService.deleteOne(id);
        }

}
