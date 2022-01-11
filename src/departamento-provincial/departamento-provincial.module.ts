import { Module } from '@nestjs/common';
import { DepartamentoProvincialService } from './departamento-provincial.service';
import { DepartamentoProvincialController } from './departamento-provincial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoProvincial } from './entity/dpto-prov.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepartamentoProvincial        
    ])
],
  providers: [DepartamentoProvincialService],
  controllers: [DepartamentoProvincialController]
})
export class DepartamentoProvincialModule {}
