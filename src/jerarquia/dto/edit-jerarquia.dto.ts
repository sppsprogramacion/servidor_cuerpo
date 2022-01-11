import { PartialType } from '@nestjs/mapped-types';
import { CreateJerarquiaDto } from './create-jerarquia.dto';

export class EditJerarquiaDto extends PartialType(CreateJerarquiaDto){}