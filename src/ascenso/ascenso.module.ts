import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ascenso } from './entities/ascenso.entity';
import { AscensoService } from './ascenso.service';
import { AscensoController } from './ascenso.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Ascenso
        ])
    ],
    providers: [AscensoService],
    controllers: [AscensoController],
})
export class AscensoModule {}
