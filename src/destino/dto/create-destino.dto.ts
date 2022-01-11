import{ Length, IsString} from 'class-validator';


export class CreateDestinoDto {
    
    @IsString()
    @Length(2,100,{message:'El destino debe tener entre $constraint1 y $constraint2 caracteres'})
    destino: string;
    

}
