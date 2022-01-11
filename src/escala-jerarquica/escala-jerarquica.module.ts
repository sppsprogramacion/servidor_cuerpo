import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscalaJerarquica } from './entities/escala-jerarquica.entity';
import { EscalaJerarquicaService } from './escala-jerarquica.service';
import { EscalaJerarquicaController } from './escala-jerarquica.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EscalaJerarquica
        ])
    ],
    providers: [EscalaJerarquicaService],
    controllers: [EscalaJerarquicaController]
})
export class EscalaJerarquicaModule {}
