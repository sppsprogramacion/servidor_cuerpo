import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escalafon } from './entities/escalafon.entity';
import { EscalafonService } from './escalafon.service';
import { EscalafonController } from './escalafon.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Escalafon
        ])
    ],
    providers: [EscalafonService],
    controllers: [EscalafonController]
})
export class EscalafonModule {}
