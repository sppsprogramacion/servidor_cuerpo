import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Provincia
        ])
    ],
    providers: [ProvinciaService],
    controllers: [ProvinciaController]
})
export class ProvinciaModule {}
