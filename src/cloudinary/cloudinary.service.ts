import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, DeleteApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import path = require('path');

@Injectable()
export class CloudinaryService {

  /**
   * Servicio  que Carga de Imagenes de Usuarios en Cloudinary
   * @param file 
   * @returns 
   */
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    
    return new Promise((resolve, reject) => {
       //v2.uploader.upload(file.path, function(error, result) { console.log(result, error) });
      
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error){
          console.log('ERROR QUE VIENE DE CLOUDINARY', error.message);
          return reject(error.message);
        } 
        resolve(result);
      });
      
      toStream(file.buffer).pipe(upload);
    });
  }

async deleteImage(fileName: string): Promise<DeleteApiResponse>{
  let nombre = path.basename(fileName, '.jpg');
 // console.log('EL ID DE LA FOTO LUEGO DE PREGUNTAR POR EXTENSION jpg ES>>>', nombre);
  nombre = path.basename(nombre, '.jpeg');
 // console.log('EL ID DE LA FOTO LUEGO DE PREGUNTAR POR EXTENSION jpeg ES>>>', nombre);
      nombre = path.basename(nombre, '.png');
   //   console.log('EL ID DE LA FOTO LUEGO DE PREGUNTAR POR EXTENSION png ES>>>', nombre);
      nombre = path.basename(nombre, '.gif');
     // console.log('EL ID DE LA FOTO LUEGO DE PREGUNTAR POR EXTENSION gif ES>>>', nombre);
      
  
  return new Promise((resolve, reject) => {
    v2.uploader.destroy(nombre, function(error,result) {
      if(error){
        reject(error);
      }
      if(result.result === 'ok'){
        resolve(result);
      }else{
        reject(new Error(result.result));
      }
  });

});

}
}





