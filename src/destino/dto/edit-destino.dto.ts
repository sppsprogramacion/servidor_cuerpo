import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinoDto } from './create-destino.dto';

export class EditDestinoDto extends PartialType(CreateDestinoDto){}