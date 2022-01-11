import { PartialType } from '@nestjs/mapped-types';
import { CreateProvinciaDto } from './create-provincia.dto';

export class EditProvinciaDto extends PartialType(CreateProvinciaDto){}