import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadDto } from './create-ciudad.dto';

export class EditCiudadDto extends PartialType(CreateCiudadDto){}