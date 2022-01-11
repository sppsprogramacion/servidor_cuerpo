import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';

@Controller('provincia')
export class ProvinciaController {
    constructor(
        private readonly provinciaService: ProvinciaService
    ){}

    @Get()
    async getAll(){
        try {
          return await this.provinciaService.getAll();  
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
