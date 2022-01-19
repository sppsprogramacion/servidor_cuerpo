import{ Length, IsString, IsInt, IsOptional, Min, IsDateString, IsBoolean} from 'class-validator';


export class CreateTrasladoDto {

    @IsInt({message:'El dni debe ser un número entero'})
    @Min(1000000,{message:'El valor que intenta asignar a Dni no es válido'}) 
    dni_personal: number;
    
    @IsInt({message:'El legajo debe ser una clave entera'})
    @Min(100,{message:'El valor que intenta asignar a Legajo no es válido'})
    legajo: number;

    @IsInt({message:'El destino debe ser una clave entera'})
    destino_id: number;   


    @IsDateString()
    fecha: Date;

    @IsString()
    @Length(1,100,{message:'El instrumento debe tener entre $constraint1 y $constraint2 caracteres'})
    instrumento: string;

    @IsInt({message:'La cantidad de fojas debe ser una clave entera'})
    fojas: number;    

    @IsBoolean()
    vigente: boolean;


}
