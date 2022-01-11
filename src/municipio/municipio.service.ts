import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';
import { Repository } from 'typeorm';
import { EditMunicipioDto } from './dto/edit-municipio.dto';

@Injectable()
export class MunicipioService {
    constructor(
        @InjectRepository(Municipio)
        private readonly repositoryMunicipio: Repository<Municipio>
    ){}

    async getAll(){
        try {
            return await this.repositoryMunicipio.findAndCount();
        } catch (error) {
            return new BadRequestException(error.error.message);
        }
    }

    async editOne(id: number, data: EditMunicipioDto){
        try {
            const respuesta =  await this.repositoryMunicipio.update({
                id_municipio: id
            }, data);
    
            if (respuesta.affected == 0) throw new NotFoundException('Error: No se ha actualizado ningun registro')
            return respuesta;
            
        } catch (error) {
            return new BadRequestException(error.error.message);
        }
    }
}
