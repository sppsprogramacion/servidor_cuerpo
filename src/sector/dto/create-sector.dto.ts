import{ Length, IsString, IsInt, IsOptional} from 'class-validator';


export class CreateSectorDto {
    
    @IsString()
    @Length(1,200,{message:'El sector debe tener entre $constraint1 y $constraint2 caracteres'})
    sector: string;
    
    @IsInt()
    @IsOptional()
    division_id: number;

}
