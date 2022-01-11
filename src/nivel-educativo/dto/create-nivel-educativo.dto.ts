import{ Length, IsString} from 'class-validator';


export class CreateNivelEducativoDto {
    
    @IsString()
    @Length(1,100,{message:'El Nivel Educativo debe tener entre $constraint1 y $constraint2 caracteres'})
    nivel_educativo: string;
    

}
