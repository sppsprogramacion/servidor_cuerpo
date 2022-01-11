import { Body, Get, Param, Put, Post, ParseIntPipe, Delete, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, HttpException, HttpStatus, Req, BadRequestException, Patch, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import {Request, Response} from 'express';

import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto';
import { EditPersonalDto } from './dto/edit-personal.dto';

@Controller('personal')
export class PersonalController {
    
    constructor(
        private readonly personalService: PersonalService
    ){}

    @Get('foto')
     async getFoto(
         @Req()
         req: Request,
         @Res()
         res: Response
     ){
      try {
          if(!req.query.foto_nombre){
              throw new Error('Debe proporcionar el nombre de la foto del Personal');
          }
          const nombre_foto: string = req.query.foto_nombre.toString();
          
              const ruta = this.personalService.getFoto(nombre_foto);
              res.sendFile(ruta);
                   
      } catch (error) {
          throw new BadRequestException(error.message);
      }
     }

    @Get('/id/foto')
     async getFotobyLegajoPersonal(
         @Req()
         req: Request,
         @Res()
         res: Response
     ){
      try {
          if(!req.query.legajo){
              throw new Error('Debe proporcionar el legajo del Personal');
          }
             const legajo: number = parseInt(req.query.legajo.toString());
             const ruta = await this.personalService.getFotoByLegajoPersonal(legajo);
             res.sendFile(ruta);                 
          
      } catch (error) {
          throw new BadRequestException(error.message);
      }
     }

     @Get('dni')
    async getByDni(
        @Req()
        req: Request,
        @Res()
        res: Response
    ){
        try {
            if(!req.query.dni){
                throw new Error('Debe proporcionar el DNI');
            }else{
                const dni: number = parseInt(req.query.dni.toString());
                const respuesta = await this.personalService.getPersonalByDni(dni);
                res.status(200).json({
                    'data': respuesta
                });
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    
    @Get('/destino/:destino')
    async getMany(
        @Param('destino',ParseIntPipe)
        destino:number
    ){
        return await this.personalService.getMany(destino);
    }

    

    @Get()
    async getAll(){
        return await this.personalService.getAll();
    }

    @Get(':legajo')
    async getOne(
        @Param('legajo',ParseIntPipe)
        legajo: number
    ){
        return await this.personalService.getOne(legajo);
    }


    @Post()
    async create(
        @Body()
        personalDto: CreatePersonalDto
    ){
                
        return await this.personalService.createOne(personalDto);
    }

    @Put(':id')
    async editOne(
        @Param('id',ParseIntPipe)
        id: number,
        @Body()
        data: EditPersonalDto
    ){
        return await this.personalService.editOne(id, data);

    }

    @Delete(':id')
    async deleteOne(
        @Param('id',ParseIntPipe)
        id: number
        
    ){
        return await this.personalService.deleteOne(id);

    }

    @Post('foto')
    @UseInterceptors(
        FileInterceptor(
            'foto')   
       )
    async cargarFoto(
        @UploadedFile()
        foto: Express.Multer.File,
        @Req()
        req: Request,    
    ){
        try {
            if(req.query.id === null || foto === null || foto === undefined){
                    throw new Error('Debe adjuntar una imagen y el id del Personal');
            }
            if(!foto.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                throw new Error('Formato de archivo inválido (jpg|jpeg|png|gif)');
                                        }
            const id: number = parseInt(req.query.id.toString());
            
            return await this.personalService.cargarFoto(foto, id).catch((e)=>{
                throw new Error(e.message);
            });
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
