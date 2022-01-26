import { Module } from '@nestjs/common';
import { PersonalFuncionService } from './personal-funcion.service';
import { PersonalFuncionController } from './personal-funcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalFuncion } from './entities/personal-funcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        PersonalFuncion
    ])
],
  providers: [PersonalFuncionService],
  controllers: [PersonalFuncionController]
})
export class PersonalFuncionModule {}
