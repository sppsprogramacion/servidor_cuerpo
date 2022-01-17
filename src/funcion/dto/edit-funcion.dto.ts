import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionDto } from './create-funcion.dto';


export class EditFuncionDto extends PartialType(CreateFuncionDto){}