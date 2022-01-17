import { IsString, Length } from "class-validator";

export class CreateFuncionDto {
    
    @IsString()
    @Length(1,100,{message:'La funcion debe tener entre $constraint1 y $constraint2 caracteres'})
    funcion: string;

   
}