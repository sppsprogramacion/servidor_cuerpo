import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalDto } from './create-personal.dto';

export class EditPersonalDto extends PartialType(CreatePersonalDto){}