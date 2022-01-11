import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { UsuarioRole } from '../enums/usuario-role-enums';
import {hash} from 'bcryptjs';
import { Destino } from "src/destino/entities/destino.entity";

@Entity('usuarios')
export class  Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    /**
     * el correo será el "usuario" por lo que debe ser único 
     */
    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    correo: string;

    @Column({
        type: "varchar",
        nullable:false,
        select: false
            })        
    clave: string;

    @Column({
        type: "int",
        unsigned: true
     })
    dni: number;

    @Column({
        type: "varchar",
        length: 50,
           })
    nombre: string;

    @Column({
        type: "varchar",
        length: 50,
           })
   apellido: string;

   @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    default: "no-image.jpg"
       })
    img: string;

    @Column({
        type: "int",
        nullable: false
     })
    destino_id: number;

    @ManyToOne(type => Destino, {eager: true})
    @JoinColumn({
        name: "destino_id",
        referencedColumnName: "id_destino"
    })
    destino: Destino


   @CreateDateColumn()
   fecha_alta: Date;

   @UpdateDateColumn()
   ultima_actualizacion:Date;

   @DeleteDateColumn()
   fecha_baja: Date;

    @Column({
        type: "enum",
        nullable: true,
        enum: UsuarioRole,
        default: UsuarioRole.normal
        
    })
    role: UsuarioRole;
    
    
@BeforeInsert()
@BeforeUpdate()
async hashPassword(){
    if(!this.clave){
        return;
    }
    this.clave = await hash(this.clave,10);
}

    //constructor
    // constructor(req?:any){
    //     if(req){
    //         this.dni_usuario = req.body.dni_usuario;
    //         this.nombre = req.body.nombre;
    //         this.apellido = req.body.apellido;
    //         this.tipo_id = req.body.tipo_id;
    //         this.domicilio_procesal = req.body.domicilio_procesal;
    //         this.matricula = req.body.matricula;
    //         this.usuario = req.body.usuario;
    //         this.password = req.body.password;
    //         this.estudio_id = req.body.estudio_id;
    //         this.email = req.body.email;
    //         this.role = req.body.rol;
    //         this.fecha_alta = req.body.fecha_alta;
    //         this.fecha_baja = req.body.fecha_baja;
    //     }

    // }

}
