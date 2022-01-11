import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jerarquia } from './entities/jerarquia.entity';
import { JerarquiaService } from './jerarquia.service';
import { JerarquiaController } from './jerarquia.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            Jerarquia
        ])
    ],
    providers: [JerarquiaService],
    controllers: [JerarquiaController]
})
export class JerarquiaModule {}
