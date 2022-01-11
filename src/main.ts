import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { generateTypeormConfigFile } from './scripts';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configOrm = app.get(ConfigService);
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>(SERVER_PORT), 10) || 3000;

  generateTypeormConfigFile(configOrm);

  //configuración de los pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
     // Make sure that there's no unexpected data
     whitelist: true,
     forbidNonWhitelisted: true,
     forbidUnknownValues: true,

     /**
      * Detailed error messages since this is 4xx
      */
     disableErrorMessages: false,
     
     validationError: {
       /**
        * WARNING: Avoid exposing the values in the error output (could leak sensitive information)
        */
       value: false,
     },

     /**
      * Transform the JSON into a class instance when possible.
      * Depends on the type of the data on the controllers
      */
     transform: true,
    })
  );

  //configuración de la documentación
  const config = new DocumentBuilder()
  .setTitle('Servidor de la Dirección de Cuerpo Penitenciario')
  .setDescription('Descripción de la API Cuerpo')
  .setVersion('1.0')
  .addTag('cuerpo')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(port);
  const logger = new Logger();
  logger.log(`corriendo el servidor ${await app.getUrl()}`);
}
bootstrap();
