import{IsInt, Min, Length, IsOptional, IsISO8601, Matches, IsString, IsDecimal, IsDateString} from 'class-validator';

export class CreateArchivoDto {
   
    @IsInt({message:'El legajo asociado al archivo debe ser un número entero'})
    legajo_personal: number;

    @IsString()
    nombre_archivo: string;

    @IsString()
    @IsOptional()
    detalle: string;

    @IsInt({message:'El indice debe ser un número entero'})
    @IsOptional()
    indice : number;

    @IsDateString()
    fecha_documento: Date;

}
