import { UsuarioRole } from '../enums';
import{IsInt, Min, Length, IsAlphanumeric, MinLength, IsEmail, IsOptional, IsISO8601, Matches, IsEnum, IsString, IsDateString, IsDate, IsBoolean} from 'class-validator';
import { EnumToString } from 'src/helpers/enumToString';

export class CreateUserDto {
    
    @IsString()
    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El email no es correcto'})
    @Length(4,50,{message:'El usuario debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    correo: string;

    @IsString()
    @MinLength(6,{message:'La clave debe tener un mínimo de 6 caracteres'})
    clave: string;
    
    @IsInt({message:'El dni debe ser un número entero'})
    @Min(1000000,{message:'El valor que intenta asignar a Dni no es válido'})
    dni: number;
    
    @IsString()
    @Length(2,50,{message:'El nombre debe tener entre $constraint1 y $constraint2 caracteres'})
    nombre: string;
    
    @IsString()
    @Length(2,50,{message:'El apellido debe tener entre $constraint1 y $constraint2 caracteres'})
    apellido: string;

    @IsInt({message: 'El destino es un numero Entero'})
    destino_id: number;

    @IsString()
    @IsOptional()
    img: string;

    fecha_alta: Date;

    ultima_actualizacion:Date;

   
    fecha_baja: Date;
    
    /**
      * Una lista de roles de usuario
      * @example ['admin','super'.'normal']
     */
    @IsOptional()
    @IsEnum(UsuarioRole,{
      //message: `No ha introducido un valor valido(${EnumToString(UsuarioRole)})`
      message: `DEBE INGRESAR VALORES VALIDOS UNICAMENTE`
    })
    role: UsuarioRole

}
