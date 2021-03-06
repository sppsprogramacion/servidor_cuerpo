import{ Length, IsString, IsInt, IsOptional} from 'class-validator';


export class CreateSectorDto {
    
    @IsString()
    @Length(1,100,{message:'El sector debe tener entre $constraint1 y $constraint2 caracteres'})
    sector: string;
    
    @IsInt()
    @IsOptional()
    division_id: number;

    @IsInt()
    @IsOptional()
    departamento_id: number;        

    @IsInt()
    @IsOptional()
    destino_id: number;

}
