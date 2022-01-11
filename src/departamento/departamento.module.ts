import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Departamento
        ])
    ],
    providers: [DepartamentoService],
    controllers: [DepartamentoController]
})
export class DepartamentoModule {}
