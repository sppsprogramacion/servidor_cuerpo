import { Module } from '@nestjs/common';
import { Situacion } from './entities/situacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SituacionService } from './situacion.service';
import { SituacionController } from './situacion.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Situacion
        ])
    ],
    providers: [SituacionService],
    controllers: [SituacionController]
})
export class SituacionModule {}
