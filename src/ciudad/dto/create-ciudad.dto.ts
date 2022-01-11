import{ Length, IsString, IsInt} from 'class-validator';


export class CreateCiudadDto {
    
    @IsString()
    @Length(2,100,{message:'La situación debe tener entre $constraint1 y $constraint2 caracteres'})
    ciudad: string;

    @IsInt()
    municipio_id: number;    

    @IsInt()
    provincia_id: number;    

}
