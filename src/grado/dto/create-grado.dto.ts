import{ Length, IsString, IsInt} from 'class-validator';


export class CreateGradoDto {
    
    @IsString()
    @Length(1,100,{message:'El grado debe tener entre $constraint1 y $constraint2 caracteres'})
    grado: string;

    @IsInt()
    escala_jerarquica_id: number;

    @IsInt()
    jerarquia_id: number;
    

}
