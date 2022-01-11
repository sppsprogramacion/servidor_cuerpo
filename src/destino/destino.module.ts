import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destino } from './entities/destino.entity';
import { DestinoService } from './destino.service';
import { DestinoController } from './destino.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Destino
        ])
    ],
    providers: [DestinoService],
    controllers: [DestinoController]
})
export class DestinoModule {}
