import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { Repository } from 'typeorm';
import { EditPersonalDto } from './dto/edit-personal.dto';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as fs from 'fs-extra';
import * as path from 'path';

interface IPersonal{
    apellido_1: string,
    apellido_2: string,
    nombre_1: string,
    nombre_2: string,
    nombre_3: string,
    dni: number,
    fecha_nacimiento: Date,
    fecha_ingreso: Date,
    ultimo_ascenso: Date,
    legajo: number,
    cuil: string,
    sexo_id: number,
    estado_civil_id: number,
    destino_id: number,
    departamento_id: number,
    division_id: number,
    sector_id: number,
    seccion_guardia_id: number,
    funcion: string,
    escalafon_id: number,
    escala_jerarquica_id: number,
    grado_id: number,
    nacionalidad: string,
    domicilio: string,
    provincia_id: number,
    municipio_id: number,
    ciudad_id: number,
    telefonos: string,
    email: string,
    altura: number,
    peso: number,
    nivel_educativo_id: number,
    registrado_por: number,
    situacion_id: number,
    foto: string
}

@Injectable()
export class PersonalService {
    res: Response;
    constructor(
        @InjectRepository(Personal)
        private readonly personalRepository: Repository<Personal>,
        private cloudinaryService: CloudinaryService
    ){}

    
/**
 * Servicio que devuelve todos los registros de la tabla PERSONAL
 * segun la Unidad del Usuario
 * @returns 
 */
async getMany(destino_usuario: number){
    try {
        return await this.personalRepository.findAndCount({
            where: [{destino_id: destino_usuario}],
            order: {
                apellido_1: "ASC"                
            }
        });
        
    } catch (error) {
            throw new BadRequestException(error.message)
    }
}


/**
 * Servicio que devuelve todos los registros de la tabla PERSONAL
 * segun la Unidad del Usuario
 * @returns 
 */
 async getAll(){
    try {
        return await this.personalRepository.findAndCount({
            order: {
                apellido_1: "ASC"
            }
        });
        
    } catch (error) {
            throw new BadRequestException(error.message)
    }
}

/**
 * Servicio que devuelve un registro de personal según legajo
 * @param legajo
 * @returns 
 */
async getOne(legajo:number){
    try {
        return await this.personalRepository.findOneOrFail({where: [{legajo}]});
    } catch (error) {
      throw new NotFoundException('El Personal buscado  No Existe',error);

    }
}

/**
 * Servicio que edita un registro USUARIO según id
 * @param id 
 * @param data 
 * @returns 
 */
async editOne(id:number, data: EditPersonalDto){
    try {
        if(data.foto){
            throw new Error('La foto del personal  solo puede ser modificada por el servicio correspondiente!');
        }
             
    
    const respuesta =  await this.personalRepository.update(id, data);
    
    if (respuesta.affected == 0) throw new NotFoundException('Error: No se ha actualizado ningun registro')
    return respuesta;
        
    } catch (error) {
        throw new BadRequestException(error.message);
    }
               
     
}

/**
 * Servicio que elimina un registro USUARIO según ID
 * @param id 
 * @returns 
 */
async deleteOne(id:number){
    const personalSeleccionado = await this.personalRepository.findOne(id);
    if(!personalSeleccionado) throw new NotFoundException('No existe el Peronal que desea Eliminar');
    return await this.personalRepository.remove(personalSeleccionado);
}

/**
 * Servicio que crea un nuevo Usuario 
 * @param data 
 * @returns 
 */
async createOne(data: CreatePersonalDto){
    
        const existe = await this.personalRepository.findOne({legajo: data.legajo});
        if(existe) throw new BadRequestException('Ya existe un personal con el legajo que intenta utilizar!');
        const nuevo = this.personalRepository.create(data);
        const creado =  await this.personalRepository.save(nuevo);
        return creado;
}

/**
 * Servicio que retorna un registro de personal segun legajo
 * @param legajo 
 * @returns 
 */
async getPersonalByLegajo(legajo: number){
    return await this.personalRepository.findOne({where: [{legajo}]});
    //  return await this.personalRepository
    //             .createQueryBuilder('personal')
    //             .where({legajo})
    //             .getOne()
}


/**
 * Servicio que retorna un registro de personal segun dni
 * @param dni 
 * @returns 
 */
 async getPersonalByDni(dni: number){
     try {
         return await this.personalRepository.findOneOrFail({where: [{dni}]});
         
     } catch (error) {
        throw new NotFoundException('No existe el registro buscado');
     }
    
}

/**
 * Servicio que carga la foto de un personal según id
 * utiliza un parámetro nombre de foto para la ruta
 * @param foto_url 
 * @param id 
 * @returns 
 */
async cargarFoto(foto: Express.Multer.File, id: number){
    const personal = await this.personalRepository.findOne({id_personal: id});
    if(!personal){
        throw new NotFoundException('No existe el personal al que intenta asignar la imagen');
       }

    //si ya existe una foto vamos a eliminarla
        if(personal.foto !== ""){
           
            await this.cloudinaryService.deleteImage(personal.foto).catch((e) => {
                  });
           
        }

        //subiendo la imagen a cloudinary
        const foto_subida =  await this.cloudinaryService.uploadImage(foto).catch(() => {
            throw new BadRequestException('Invalid file type.');
          });
    const foto_url: string = foto_subida.url;
      
    let data: EditPersonalDto = {
        "foto": foto_url
    };
    
    const resultado = await this.personalRepository.update(id, data);
    if(resultado.affected == 0) throw new NotFoundException('No se ha actualizado el campo foto');
    return resultado;
}

/**
 * Servicio que regresa una foto utilizando como parámetro el nombre de la foto
 * @param nombre_foto 
 * @returns 
 */
getFoto(nombre_foto: string){
    try {
        const ruta = path.resolve(__dirname,`../../personal-fotos/${nombre_foto}` );
        return ruta;
        
        
    } catch (error) {
        throw new BadRequestException(error.message);
    }


}

/**
 * Servicio que regresa una foto según el legajo del personal
 * @param legajo 
 * @returns 
 */
async getFotoByLegajoPersonal(legajo: number){
    try {
        const personal: IPersonal = await this.personalRepository.findOne({legajo});
        if(!personal){
            throw new Error('El Usuario que busca no Existe');
        }
        const ruta = path.resolve(__dirname,`../../personal-fotos/${personal.foto}` );
        return ruta;
        
        
    } catch (error) {
        throw new BadRequestException(error.message);
    }


}

async deleteFoto(id:number){}

}
