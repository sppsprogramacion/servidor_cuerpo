import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ascenso } from './entities/ascenso.entity';
import { AscensoService } from './ascenso.service';
import { AscensoController } from './ascenso.controller';
import { PersonalModule } from 'src/personal/personal.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Ascenso
        ]),
        PersonalModule,
    ],
    providers: [AscensoService],
    controllers: [AscensoController],
})
export class AscensoModule {}
