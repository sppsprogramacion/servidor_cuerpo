import { IsBoolean, IsDateString, IsInt, IsString, Length, Min } from "class-validator";

export class CreatePersonalFuncionDto {
    
    @IsInt({message:'El legajo debe ser una clave entera'})
    @Min(100,{message:'El valor que intenta asignar a Legajo no es válido'})
    legajo: number;
    
    @IsInt({message:'El destino debe ser una clave entera'})
    destino_id: number;

    @IsInt({message:'El departamento debe ser una clave entera'})
    departamento_id : number;

    @IsInt({message:'La división debe ser una clave entera'})
    division_id : number;

    @IsInt({message:'El sector debe ser una clave entera'})
    sector_id : number;

    @IsInt({message:'La sección debe ser una clave entera'})
    seccion_guardia_id : number;

    @IsInt({message:'La función debe ser una clave entera'})
    funcion_id: number;
 
    @IsDateString()
    fecha: Date;

    @IsString()
    @Length(1,100,{message:'El instrumento debe tener entre $constraint1 y $constraint2 caracteres'})
    instrumento: string;

    @IsInt({message:'La cantidad de fojas debe ser un número entero'})
    fojas: number;    
    
    @IsBoolean()
    vigente: boolean;


}