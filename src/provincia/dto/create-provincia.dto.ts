import{ Length, IsString} from 'class-validator';


export class CreateProvinciaDto {
    
    @IsString()
    @Length(2,100,{message:'La provincia debe tener entre $constraint1 y $constraint2 caracteres'})
    provincia: string;
    

}
