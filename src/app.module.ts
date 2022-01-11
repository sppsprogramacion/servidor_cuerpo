import { Module } from '@nestjs/common';
import{ConfigModule, ConfigService} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from "./config/constants";
import { PersonalModule } from './personal/personal.module';
import { AuthModule } from './auth/auth.module';
import { SituacionModule } from './situacion/situacion.module';
import { SexoModule } from './sexo/sexo.module';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { DestinoModule } from './destino/destino.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { DivisionModule } from './division/division.module';
import { SectorModule } from './sector/sector.module';
import { SeccionModule } from './seccion-guardia/seccion.module';
import { EscalafonModule } from './escalafon/escalafon.module';
import { EscalaJerarquicaModule } from './escala-jerarquica/escala-jerarquica.module';
import { GradoModule } from './grado/grado.module';
import { JerarquiaModule } from './jerarquia/jerarquia.module';
import { NivelEducativoModule } from './nivel-educativo/nivel-educativo.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { MunicipioModule } from './municipio/municipio.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { DepartamentoProvincialModule } from './departamento-provincial/departamento-provincial.module';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { ArchivoModule } from './archivo/archivo.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { S3Module } from './s3/s3.module';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => 
      config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // .env.development
      validationSchema: Joi.object({ 
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development')
      }),
    }),
    UsuarioModule,
    PersonalModule,
    AuthModule,
    SituacionModule,
    SexoModule,
    EstadoCivilModule,
    DestinoModule,
    DepartamentoModule,
    DivisionModule,
    SectorModule,
    SeccionModule,
    EscalafonModule,
    EscalaJerarquicaModule,
    GradoModule,
    JerarquiaModule,
    NivelEducativoModule,
    ProvinciaModule,
    MunicipioModule,
    CiudadModule,
    DepartamentoProvincialModule,
    ArchivoModule,
    CloudinaryModule,
    S3Module,
  //  MulterModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [
    PersonalModule
  ]
})
export class AppModule {
  // constructor(){
  //   console.log('EL ENV VIENE DE>>>>>>>>', `.env.${process.env.NODE_ENV || 'development'}`);
  // }
}
