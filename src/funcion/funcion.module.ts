import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcion } from './entities/funcion.entity';
import { FuncionService } from './funcion.service';
import { FuncionController } from './funcion.controller';

@Module({

    imports: [
        TypeOrmModule.forFeature([
            Funcion
        ])
    ],

    providers: [FuncionService],

    controllers: [FuncionController],
})
export class FuncionModule {}
