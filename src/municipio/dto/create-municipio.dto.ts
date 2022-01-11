import{ Length, IsString, IsInt} from 'class-validator';


export class CreateMunicipioDto {
    
    @IsString()
    @Length(2,200,{message:'El municipio debe tener entre $constraint1 y $constraint2 caracteres'})
    municipio: string;

    @IsInt()
    provincia_id: number;
    
    @IsInt()
    departamento_id: number;

}
