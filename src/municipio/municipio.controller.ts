import { BadRequestException, Controller, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { EditMunicipioDto } from './dto/edit-municipio.dto';

@Controller('municipio')
export class MunicipioController {
    constructor(
        private readonly municipioService: MunicipioService
    ){}

    @Get()
    async getAll(){
        try {
            return await this.municipioService.getAll();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':id')
    async editOne(
        @Param('id',ParseIntPipe)
        id: number,
        @Body()
        data: EditMunicipioDto
    ){
        return await this.municipioService.editOne(id, data);

    }

}
