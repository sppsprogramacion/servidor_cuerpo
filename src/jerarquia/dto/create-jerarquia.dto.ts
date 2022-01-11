import{ Length, IsString} from 'class-validator';


export class CreateJerarquiaDto {
    
    @IsString()
    @Length(1,100,{message:'La situación debe tener entre $constraint1 y $constraint2 caracteres'})
    jerarquia: string;
    

}
