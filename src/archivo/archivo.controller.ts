import { Controller, Body, Get, Param, Put, Post, ParseIntPipe, Delete, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, HttpException, HttpStatus, Req, BadRequestException, Patch, Res } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import {Request, Response} from 'express';
//import { PersonalService } from '../personal/personal.service';
import { S3Service } from '../s3/s3.service';
import { File } from 'aws-sdk/clients/codecommit';



@Controller('archivo')
export class ArchivoController {
  res: any;
  constructor(
    private readonly archivoService: ArchivoService,
    private readonly s3Service: S3Service
    ) {}

  @Post()
  async create(
    @Body()
     createArchivoDto: CreateArchivoDto
     ) {
       try {
         return await this.archivoService.create(createArchivoDto);         
       } catch (error) {
        throw new BadRequestException(error.message);
       }
  }

  @Get(':legajo')
  async findManyByLegajo(
    @Param('legajo', ParseIntPipe)
    legajo: number
  ) {
    try {
      return await this.archivoService.findByLegajo(legajo);      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/id/pdf')
  async findOneById(
    @Req()
      req: Request,
      @Res()
      res: Response
    ) {
      try {
        if(!req.query.id){
            throw new Error('Debe proporcionar el id del archivo');
        }
        
        const id: number = parseInt(req.query.id.toString());
        const ruta = await this.archivoService.findOneById(id);
        res.sendFile(ruta);        
    } catch (error) {
        throw new BadRequestException(error.message);
    }

  }



  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) 
    id: number, 
    @Body()
    updateArchivoDto: UpdateArchivoDto) {
      try {
        return await this.archivoService.update(id, updateArchivoDto);
          } catch (error) {
            throw new BadRequestException(error.message); 
      }
  }

  @Delete(':id')
  async remove(
   @Param('id', ParseIntPipe) 
   id: number
   ) {
     try {
       return await this.archivoService.remove(+id);
       
     } catch (error) {
       throw new BadRequestException(error.message);
       
     }
  }



   @Post('pdf')
   @UseInterceptors(
        FileInterceptor(
            'pdf',{
                fileFilter: (req, file, cb) => {
                           if(!file.originalname.match(/\.(pdf)$/)){
                                return cb(new HttpException('Sólo se admiten archivos PDF!', HttpStatus.BAD_REQUEST),false);
                             }
                          cb(null, true);
                                             
                    }
            })   
       )
   async cargarPDF(
       @UploadedFile()
       pdf: File,
       @Body()
       data_body: Request    
   ){
            try {
         let fecha: Date = null;      
                  
         if(data_body['legajo'] === null || data_body['legajo'] === undefined){
            throw new Error('Debe asignar el pdf a un personal');
           }
           if(data_body['detalle'] === null || data_body['detalle'] === undefined){
            throw new Error('El detalle o titulo del documento es obligatorio!');
           }
           const detalle: string = data_body['detalle'].toString() || "";
           const indice: number = parseInt(data_body['indice'].toString()) || 0;
         if(data_body['fecha_documento']){
              fecha =  new Date(data_body['fecha_documento'].toString());
           }else{
            throw new Error('El campo fecha del pdf es obligatorio');
           }

           this.res = await this.s3Service.uploadFile(pdf).then();
           const nameFile: string = this.res['key'];
           const nuevoPdf: CreateArchivoDto = {
                         legajo_personal:   parseInt(data_body['legajo'].toString()),
                         nombre_archivo: nameFile,
                         detalle: detalle,
                         indice: indice,
                         fecha_documento: fecha 
                     }
                     
                   await this.archivoService.cargarPDF(nuevoPdf);


            return this.res;
      } catch (error) {
                    throw new BadRequestException(error.message);        
      }
        
   }


   @Get('/s3/pdf')
   async findPdf(
     @Req()
       req: Request,
       @Res()
       res: Response
     ) {
       try {
         if(!req.query.key){
             throw new Error('Debe proporcionar la key del archivo');
         }
         const key = req.query.key.toString();
         
         const filePdf = await this.s3Service.s3_getPdf(key);
         filePdf.pipe(res);
         //return filePdf;
        
     } catch (error) {
         throw new BadRequestException(error.message);
     }
 
   }


}
