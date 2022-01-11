import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinciaService {
    constructor(
        @InjectRepository(Provincia)
        private readonly provinciaRepository: Repository<Provincia>
    ){}

    async getAll(){
        try {
            return await this.provinciaRepository.find();
        } catch (error) {
            return new BadRequestException(error.error.message);
        }
    }
}
