import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Sector
        ])
    ],
    providers: [SectorService],
    controllers: [SectorController]
})
export class SectorModule {}
