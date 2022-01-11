import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoCivilDto } from './create-estado-civil.dto';

export class EditEstadoCivilDto extends PartialType(CreateEstadoCivilDto){}