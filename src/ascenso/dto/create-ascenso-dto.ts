import { IsBoolean, IsDateString, IsInt, IsString, Length, Min } from "class-validator";

export class CreateAscensoDto {

    @IsInt({message:'El dni debe ser un número entero'})
    @Min(1000000,{message:'El valor que intenta asignar a Dni no es válido'})
    dni_personal: number;

    @IsInt({message:'El legajo debe ser una clave entera'})
    @Min(100,{message:'El valor que intenta asignar a Legajo no es válido'})
    legajo: number;    

    @IsInt({message:'El grado debe ser una clave entera'})
    grado_id: number;
    
    @IsInt({message:'El escalafon debe ser una clave entera'})
    escalafon_id: number;
    
    @IsDateString()
    fecha_ascenso: Date;

    @IsString()
    @Length(1,100,{message:'El instrumento debe tener entre $constraint1 y $constraint2 caracteres'})
    instrumento: string;

    @IsBoolean()
    vigente: boolean;

    @IsInt({message:'El orden debe ser una clave entera'})
    @Min(1,{message:'El valor que intenta asignar a Legajo no es válido'})
    orden: number;
    
    @IsInt({message:'El anio debe ser una clave entera'})
    @Min(1000,{message:'El valor que intenta asignar a año no es válido'})
    anio_orden: number;

    @IsString()
    @Length(1,100,{message:'El instrumento del orden debe tener entre $constraint1 y $constraint2 caracteres'})
    instrumento_orden: string;

    @IsDateString()
    fecha_instrumento_orden: Date;
}