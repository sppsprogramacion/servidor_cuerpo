import { PartialType } from '@nestjs/mapped-types';
import { CreateSexoDto } from './create-sexo.dto';

export class EditSexoDto extends PartialType(CreateSexoDto){}