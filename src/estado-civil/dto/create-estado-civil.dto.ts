import{ Length, IsString} from 'class-validator';


export class CreateEstadoCivilDto {
    
    @IsString()
    @Length(1,50,{message:'El estado civil debe tener entre $constraint1 y $constraint2 caracteres'})
    estado_civil: string;
    

}
