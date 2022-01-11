import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeccionGuardia } from './entities/seccion-guardia.entity';
import { SeccionGuardiaService } from './seccion-guardia.service';
import { SeccionGuardiaController } from './seccion-guardia.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SeccionGuardia
        ])
    ],
    providers: [SeccionGuardiaService],
    controllers: [SeccionGuardiaController]
})
export class SeccionModule {}
