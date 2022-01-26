import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalFuncionDto } from './create-personal-funcion.dto';


export class EditPersonalFuncionDto extends PartialType(CreatePersonalFuncionDto){}