import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelEducativo } from './entities/nivel-educativo.entity';
import { NivelEducativoService } from './nivel-educativo.service';
import { NivelEducativoController } from './nivel-educativo.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NivelEducativo
        ])
    ],
    providers: [NivelEducativoService],
    controllers: [NivelEducativoController]
})
export class NivelEducativoModule {}
