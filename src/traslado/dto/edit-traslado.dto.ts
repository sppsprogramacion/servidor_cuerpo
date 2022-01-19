import { PartialType } from '@nestjs/mapped-types';
import { CreateTrasladoDto } from './create-traslado.dto';

export class EditTrasladoDto extends PartialType(CreateTrasladoDto){}