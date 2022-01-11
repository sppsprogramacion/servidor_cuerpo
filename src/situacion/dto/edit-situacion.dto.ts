
import { PartialType } from '@nestjs/mapped-types';
import { CreateSituacionDto } from './create-situacion.dto';

export class EditSituacionDto extends PartialType(CreateSituacionDto) {}