import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { PersonalModule } from '../personal/personal.module';
import { S3Service } from '../s3/s3.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      Archivo
    ]),
    PersonalModule
  ],
  controllers: [ArchivoController],
  providers: [
    ArchivoService,
    S3Service
  ],
  exports:[ ]
})
export class ArchivoModule {}
