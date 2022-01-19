import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traslado } from './entities/traslado.entity';
import { TrasladoService } from './traslado.service';
import { TrasladoController } from './traslado.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Traslado
        ])
    ],
    providers: [TrasladoService],
    controllers: [TrasladoController],
})
export class TrasladoModule {}
