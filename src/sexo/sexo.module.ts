import { Module } from '@nestjs/common';
import { Sexo } from './entities/sexo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SexoService } from './sexo.service';
import { SexoController } from './sexo.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Sexo
        ])
    ],
    providers: [SexoService],
    controllers: [SexoController]
})
export class SexoModule {}
