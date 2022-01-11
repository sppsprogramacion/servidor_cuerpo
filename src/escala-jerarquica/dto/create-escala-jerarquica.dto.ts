import{ Length, IsString} from 'class-validator';


export class CreateEscalaJerarquicaDto {
    
    @IsString()
    @Length(1,200,{message:'La escala jerárquica debe tener entre $constraint1 y $constraint2 caracteres'})
    escala_jerarquica: string;
    

}
