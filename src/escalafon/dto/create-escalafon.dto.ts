import{ Length, IsString} from 'class-validator';


export class CreateEscalafonDto {
    
    @IsString()
    @Length(1,200,{message:'El escalafón debe tener entre $constraint1 y $constraint2 caracteres'})
    escalafon: string;
    

}
