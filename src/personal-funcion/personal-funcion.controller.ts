import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PersonalFuncionService } from './personal-funcion.service';
import { CreatePersonalFuncionDto } from './dto/create-personal-funcion.dto';
import { EditPersonalFuncionDto } from './dto/edit-personal-funcion.dto';
import { TrasladoService } from '../traslado/traslado.service';
import { Traslado } from '../traslado/entities/traslado.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { PersonalService } from '../personal/personal.service';
import { PersonalFuncion } from './entities/personal-funcion.entity';

@Controller('personal-funcion')
export class PersonalFuncionController {
    constructor(
        private readonly personalFuncionService: PersonalFuncionService,
        private readonly trasladoService: TrasladoService,
        private readonly personalService: PersonalService
    ){}

    @Get()
    async getAll(){
        return await this.personalFuncionService.getAll();
    }
    
    @Get('/legajo/:legajo')
    async getFuncionesXLegajo(        
        @Param('legajo')
        legajo: number
    ){        
        let legajox:number=0;
        
        if(Number.isInteger(legajo)){
            legajox = legajo;
        }
        else{
            throw new NotFoundException('Debe proporcionar un numero entero para el Legajo');
        }    
                
        return await this.personalFuncionService.getFuncionesXLegajo(legajox);
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.personalFuncionService.getOne(id);
    }

    @Post()
    async create(
        @Body()
        data: CreatePersonalFuncionDto
    ){

        const respuesta_traslado= await this.trasladoService.getTrasladoVigenteXLegajo(data.legajo);
        if(respuesta_traslado){
            if(respuesta_traslado.confirmado==false){
                throw new NotFoundException('Debe confirmar el traslado para asignar una función');
            }
            else{
                //editar destino en el personal
                let dataPersonal: Partial<Personal>= new Personal;
                dataPersonal = {
                    destino_id: data.destino_id,
                    departamento_id: data.departamento_id,
                    division_id: data.division_id,
                    sector_id: data.sector_id,
                    funcion_id:data.funcion_id,
                    seccion_guardia_id: data.seccion_guardia_id,
                }        
                
                const respuesta_personal =  await this.personalService.editOneXLegajo(data.legajo,dataPersonal);
                //Fin editar destino en el personal

                //EDICION DE CAMPO VIGENTE COMO FALSO EN TODOS LOS REGISTROS DE TRASLADO DE PERSONAL
                let data_aux: EditPersonalFuncionDto
                data_aux = {
                    vigente:false
                }          
                const respuesta_traslado = await this.personalFuncionService.quitarFuncionVigente(data.legajo, data_aux);
                //fin EDICION DE CAMPO VIGENTE COMO FALSO EN TODOS LOS REGISTROS DE TRASLADO DE PERSONAL

                data.vigente=true;
                return await this.personalFuncionService.createOne(data);
            }
        }
        else{
            throw new NotFoundException('No se encontro un traslado vigente o el legajo esta mal ingresado');
        }
        
        // return await this.personalFuncionService.createOne(data);
    }

    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        data: EditPersonalFuncionDto
    ){
        return await this.personalFuncionService.editOne(id, data);
    }

    @Put('/quitar/:legajo')
    async quitarTrasladoVigente(
        @Param('legajo', ParseIntPipe)
        legajo: number,
        @Body()
        data: EditPersonalFuncionDto
    ){
        return await this.personalFuncionService.quitarFuncionVigente(legajo, data);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
        ){
            return await this.personalFuncionService.deleteOne(id);
        }

}
