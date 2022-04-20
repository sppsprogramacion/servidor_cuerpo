import { PartialType } from "@nestjs/swagger";
import { CreateAscensoDto } from './create-ascenso-dto';


export class EditAscensoDto extends PartialType(CreateAscensoDto){}