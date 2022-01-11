import { Body, Get, Param, Put, Post, ParseIntPipe, Delete, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, HttpException, HttpStatus, Req, BadRequestException, Patch, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import {Request, Response} from 'express';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UsuarioService } from './usuario.service';
import { CLOUDINARY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } from 'src/config/constants';

@Controller('usuarios')
export class UsuarioController {
    // cloud_name = '';
    // api_key = '';
    // api_secret = '';

    constructor(
        private readonly usuarioService: UsuarioService,
        private config: ConfigService
    ){
        // this.cloud_name =   config.get<string>(CLOUDINARY_CLOUD_NAME);
        // this.api_key =  config.get<string>(CLOUDINARY_API_KEY);
        // this. api_secret =  config.get<string>(CLOUDINARY_API_SECRET);
        // this.cloud_name =   process.env.CLOUDINARY.CLOUD_NAME;
        // this.api_key =  process.env.CLOUDINARY_API_KEY);
        // this. api_secret =  process.env.CLOUDINARY_API_SECRET);
       
    }

    @Get('foto')
     async getFoto(
         @Req()
         req: Request,
         @Res()
         res: Response
     ){
      try {
          if(!req.query.foto_nombre){
              throw new Error('Debe proporcionar el nombre de la foto del Usuario');
          }
          const nombre_foto: string = req.query.foto_nombre.toString();
          
              const ruta = this.usuarioService.getFoto(nombre_foto);
              res.sendFile(ruta);
                   
      } catch (error) {
          throw new BadRequestException(error.message);
      }
     }

    @Get('/id/foto')
     async getFotobyIdUsuario(
         @Req()
         req: Request,
         @Res()
         res: Response
     ){
      try {
          if(!req.query.id){
              throw new Error('Debe proporcionar el id del Usuario');
          }
          const id: number = parseInt(req.query.id.toString());
          
              const ruta = await this.usuarioService.getFotoByIdUsuario(id);
              //res.sendFile(rut);
              res.status(200).send({
                  foto_usuario: ruta
              });
          
        
          
      } catch (error) {
          throw new BadRequestException(error.message);
      }
     }
    
    @Get()
    async getAll(){
        return await this.usuarioService.getMany();
    }

    @Get(':id')
    async getOne(
        @Param('id',ParseIntPipe)
        id: number
    ){
        return await this.usuarioService.getOne(id);
    }


    @Post()
    async create(
        @Body()
        usuarioDto: CreateUserDto
    ){                
        return await this.usuarioService.createOne(usuarioDto);
    }

    @Put(':id')
    async editOne(
        @Param('id',ParseIntPipe)
        id: number,
        @Body()
        data: EditUserDto
    ){
        return await this.usuarioService.editOne(id, data);

    }

    @Delete(':id')
    async deleteOne(
        @Param('id',ParseIntPipe)
        id: number        
    ){
        return await this.usuarioService.deleteOne(id);
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
                    //console.log(`CREDENCIALES>>>${this.cloud_name} - ${this.api_key} - ${this.api_secret}`);
            if(req.query.id === null || foto === null || foto === undefined){
                    throw new Error('No olvide adjuntar un archivo imagen y el parámetro id del  usuario!!');
            }
            if(!foto.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                throw new Error('Formato de archivo inválido (jpg|jpeg|png|gif)');
                                          }
            const id: number = parseInt(req.query.id.toString());
            return await this.usuarioService.cargarFoto(foto, id).catch((e)=>{
                throw new Error(e.message);
            });
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


    @Delete('/delete/foto')
    async deleteFoto(
        @Req()
        req: Request
        ){
            try {
                
                if(req.query.id === null || req.query.id === undefined){
                    throw new Error("Debe Especificar el Parámetro id del Usuario!");
                    }        
                const id: number = parseInt(req.query.id.toString());
                
               return await this.usuarioService.deleteFoto(id).then(async (respuesta) => {
                   await this.usuarioService.editOne(id,{img: null}).then();
                    return {
                        status: 'OK',
                        message: "Se ha eliminado la foto de la Nube!"
                    }
                }).catch((e)=>{
                    throw new Error(e.message);
                });
            } catch (error) {
                throw new BadRequestException(error.message);
            }
        

    }


}
