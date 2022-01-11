import { PartialType } from '@nestjs/mapped-types';
import { CreateSeccionGuardiaDto } from './create-seccion-guardia.dto';

export class EditSeccionGuardiaDto extends PartialType(CreateSeccionGuardiaDto){}