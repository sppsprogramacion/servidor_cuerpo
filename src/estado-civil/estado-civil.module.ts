import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCivil } from './entities/estado-civil.entity';
import { EstadoCivilService } from './estado-civil.service';
import { EstadoCivilController } from './estado-civil.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EstadoCivil
        ])
    ],
    providers: [EstadoCivilService],
    controllers: [EstadoCivilController]
})
export class EstadoCivilModule {}
