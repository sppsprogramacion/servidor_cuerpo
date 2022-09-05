import { Body, Get, Param, Put, Post, ParseIntPipe, Delete, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, HttpException, HttpStatus, Req, BadRequestException, Patch, Res, NotFoundException } from '@nestjs/common';
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

    // @Get('dni')
    // async getByDni(
    //     @Req()
    //     req: Request,
    //     @Res()
    //     res: Response
    // ){
    //     try {
    //         if(!req.query.dni){
    //             throw new Error('Debe proporcionar el DNI');
    //         }else{
    //             const dni: number = parseInt(req.query.dni.toString());
    //             const respuesta = await this.personalService.getPersonalByDni(dni);
    //             res.status(200).json({
    //                 'data': respuesta
    //             });
    //         }
    //     } catch (error) {
    //         throw new BadRequestException(error.message);
    //     }
    // }

    @Get('datos-credencial')
    async getdatosCredencial(
        @Req()
        req: Request
    ){
        let legajo: number = parseInt(req.query.legajo.toString());
        if(isNaN(legajo)) throw new NotFoundException("El legajo del personal debe ser un número entero");
        return this.personalService.getDatosCredencial(legajo);
    }

    @Get('/dni/:dni')
    async getByDni(
        @Param('dni')
        dni:number
    ){
        
        try {
            if(!dni){
                throw new Error('Debe proporcionar el DNI');
            }else{

                
                //const dni: number = parseInt(req.query.dni.toString());
                return await this.personalService.getPersonalByDni(dni);
                
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
        personalDto.destino_id = 8;
        personalDto.departamento_id = 3;
        personalDto.division_id = 1;
        personalDto.sector_id = 1;
        personalDto.seccion_guardia_id = 1;
        personalDto.funcion_id = 1;
        personalDto.escala_jerarquica_id = 3;
        personalDto.escalafon_id = 3;
        personalDto.grado_id= 18;      

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

    @Put('/legajo/:legajo')
    async editOneXLegajo(
        @Param('legajo',ParseIntPipe)
        legajo: number,
        @Body()
        data: EditPersonalDto
    ){
        return await this.personalService.editOneXLegajo(legajo, data);

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
