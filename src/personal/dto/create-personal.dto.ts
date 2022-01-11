import{IsInt, Min, Length, IsOptional, IsISO8601, Matches, IsString, IsDecimal, IsDateString} from 'class-validator';


export class CreatePersonalDto {
    
    @IsString()
    @Length(2,50,{message:'El primer apellido debe tener entre $constraint1 y $constraint2 caracteres'})
    apellido_1: string;

    @IsString()

    @IsOptional()
    apellido_2: string;

    @IsString()
    @Length(2,50,{message:'El primer nombre debe tener entre $constraint1 y $constraint2 caracteres'})
    nombre_1: string;

    @IsString()

    @IsOptional()
    nombre_2: string;

    @IsString()

    @IsOptional()
    nombre_3: string;

    @IsInt({message:'El dni debe ser un número entero'})
    @Min(1000000,{message:'El valor que intenta asignar a Dni no es válido'})
    dni: number;

    @IsOptional()
    @IsDateString()
    fecha_nacimiento: Date;

    @IsOptional()
    @IsDateString()
    fecha_ingreso: Date;

    @IsOptional()
    @IsDateString()
    ultimo_ascenso: Date;

    @IsInt({message:'El legajo debe ser una clave entera'})
    @Min(100,{message:'El valor que intenta asignar a Legajo no es válido'})
    legajo: number;

    @IsString()
    @Matches(/\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/,{message:'El cuil no tiene un formato correcto (Ej. 20-32505421-2)'})
    @Length(2,50,{message:'El cuil debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    cuil: string;

    @IsInt({message:'El sexo es una clave entera'})
    sexo_id: number;

    @IsInt({message:'El estado civil debe ser una clave entera'})
    estado_civil_id: number;

    @IsInt({message:'El destino debe ser una clave entera'})
    destino_id: number;

    @IsInt({message:'El departamento debe ser una clave entera'})
    departamento_id: number;

    @IsInt({message:'La división debe ser una clave entera'})
    division_id: number;

    @IsInt({message:'El sector debe ser una clave entera'})
    sector_id: number;

    @IsInt({message:'La seccion debe ser una clave entera'})
    seccion_guardia_id: number;

    @IsString()
    @Length(1,200,{message:'La función es un texto que debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    funcion: string;

    @IsInt({message:'El escalafón debe ser una clave entera'})
    escalafon_id: number;

    @IsInt({message:'La escala jerárquica debe ser una clave entera'})
    escala_jerarquica_id: number;

    @IsInt({message:'El grado debe ser una clave entera'})
    grado_id: number;

    @IsString()
    nacionalidad: string;

    @IsString()
    @Length(1,300,{message:'El domicilio debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    domicilio: string;

    @IsInt({message:'La provincia debe ser una clave entera'})
    provincia_id: number;

    @IsInt({message:'El departamento provincial debe ser una clave entera'})
    departamento_provincial_id: number;

    @IsInt({message:'El municipio debe ser una clave entera'})
    municipio_id: number;

    @IsInt({message:'La ciudad debe ser una clave entera'})
    ciudad_id: number;

    @IsString()
    @Length(1,300,{message:'El teléfono debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    telefonos: string;

    @IsString()
    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El email no es correcto'})
    @Length(4,50,{message:'El email debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    @IsOptional()
    email: string;

    // @IsDecimal({
    //     decimal_digits: '2',
    //     force_decimal: true
    // })
    @IsOptional()
    altura: number;

    
    @IsOptional()
    peso: number;

    @IsInt({message:'El nivel educativo es una clave entera'})
    nivel_educativo_id: number;

    @IsInt({message:'El usuario que registra es una clave entera'})
    @IsOptional()
    registrado_por: number;

    @IsInt({message:'La situacion del personal es una clave entera'})
    situacion_id: number;

    @IsString()
    @IsOptional()
    foto: string;

    @IsString()
    @IsOptional()
    detalles: string;

    
}
