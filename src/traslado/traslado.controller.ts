import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TrasladoService } from './traslado.service';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { EditTrasladoDto } from './dto/edit-traslado.dto';
import { get } from 'http';
import { PersonalService } from '../personal/personal.service';
import { Personal } from 'src/personal/entities/personal.entity';
import { Traslado } from './entities/traslado.entity';


@Controller('traslado')
export class TrasladoController {
    constructor(
        private readonly trasladoService: TrasladoService,
        private readonly personalService: PersonalService
    ){}

    @Get()
    async getAll(){
        return await this.trasladoService.getAll();
    }
    
    @Get('/legajo/:legajo')
    async getTrasladosXLegajo(        
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
                
        return await this.trasladoService.getTrasladosXLegajo(legajox);
    }

    @Get('/nuevos/')
    async getNuevosTrasladosTodos(){             
                
        return await this.trasladoService.getNuevosTrasladosTodos();
    }

    @Get('/nuevos-organismo/:id_organismo')
    async getNuevosTrasladosXOrganismo(        
        @Param('id_organismo')
        id_organismo: number
    ){        
        let organismox:number=0;
        
        if(Number.isInteger(id_organismo)){
            organismox = id_organismo;
        }
        else{
            throw new NotFoundException('Debe proporcionar un numero entero para el Legajo');
        }    
                
        return await this.trasladoService.getNuevosTrasladosXOrganismo(organismox);
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return await this.trasladoService.getOne(id);
    }

    @Post()
    async create(
        @Body()
        data: CreateTrasladoDto
    ){
        //editar destino en el personal
        let dataPersonal: Partial<Personal>= new Personal;
        dataPersonal = {
            destino_id: data.destino_id,
            departamento_id: 3,
            division_id: 1,
            sector_id: 1,
            funcion_id: 1,
            seccion_guardia_id: 1
        }        
        
        const respuesta =  await this.personalService.editOneXLegajo(data.legajo,dataPersonal);
        //Fin editar destino en el personal
    
        //EDICION DE CAMPO VIGENTE COMO FALSO EN TODOS LOS REGISTROS DE TRASLADO DE PERSONAL
        let data_aux: Partial<Traslado>= new Traslado;
        data_aux = {
            vigente:false
        }          
        const respuesta2 = await this.trasladoService.quitarTrasladoVigente(data.legajo, data_aux);

        //GUARDAR NUEVO TRASLADO
        return await this.trasladoService.createOne(data);
    }

    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe)
        id: number,
        @Body()
        data: EditTrasladoDto
    ){
        return await this.trasladoService.editOne(id, data);
    }

    @Put('/quitar/:legajo')
    async quitarTrasladoVigente(
        @Param('legajo', ParseIntPipe)
        legajo: number,
        @Body()
        data: EditTrasladoDto
    ){
        return await this.trasladoService.quitarTrasladoVigente(legajo, data);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe)
        id: number
        ){
            return await this.trasladoService.deleteOne(id);
        }


}
