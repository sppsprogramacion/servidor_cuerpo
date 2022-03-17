import { Module } from '@nestjs/common';
import { PersonalFuncionService } from './personal-funcion.service';
import { PersonalFuncionController } from './personal-funcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalFuncion } from './entities/personal-funcion.entity';
import { TrasladoModule } from '../traslado/traslado.module';
import { PersonalModule } from '../personal/personal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        PersonalFuncion
    ]),
    TrasladoModule,
    PersonalModule
],
  providers: [PersonalFuncionService],
  controllers: [PersonalFuncionController]
})
export class PersonalFuncionModule {}
