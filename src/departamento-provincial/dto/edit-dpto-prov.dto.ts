import { PartialType } from '@nestjs/mapped-types';
import { CreateDptoProvDto } from './create-dpto-prov.dto';


export class EditDptoProvDto extends PartialType(CreateDptoProvDto){}
