import{ Length, IsString} from 'class-validator';


export class CreateSexoDto {
    
    @IsString()
    @Length(1,50,{message:'El sexo debe tener entre $constraint1 y $constraint2 caracteres'})
    sexo: string;
    

}
