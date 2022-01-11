import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entities/division.entity';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Division
        ])
    ],
    providers: [DivisionService],
    controllers: [DivisionController]
})
export class DivisionModule {}
