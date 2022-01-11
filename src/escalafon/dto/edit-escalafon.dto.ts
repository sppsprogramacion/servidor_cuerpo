import { PartialType } from '@nestjs/mapped-types';
import { CreateEscalafonDto } from './create-escalafon.dto';

export class EditEscalafonDto extends PartialType(CreateEscalafonDto){}