import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipioDto } from './create-municipio.dto';

export class EditMunicipioDto extends PartialType(CreateMunicipioDto){}