import{ Length, IsString, IsInt, IsOptional} from 'class-validator';


export class CreateDepartamentoDto {
    
    @IsString()
    @Length(1,200,{message:'El Departamento tener entre $constraint1 y $constraint2 caracteres'})
    departamento: string;
    
    @IsInt()
    @IsOptional()
    destino_id: number;
     

}
