import{ Length, IsString} from 'class-validator';


export class CreateSituacionDto {
    
    // @Length(2,100,{message:'La situación debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsString()
    situacion: string;
    

}
