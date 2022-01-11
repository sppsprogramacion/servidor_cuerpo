import{ Length, IsString, IsInt, IsOptional} from 'class-validator';


export class CreateSeccionGuardiaDto {
    
    @IsString()
    @Length(1,200,{message:'La sección debe tener entre $constraint1 y $constraint2 caracteres'})
    seccion: string;
    
    @IsInt()
    @IsOptional()
    departamento_id: number;

}
