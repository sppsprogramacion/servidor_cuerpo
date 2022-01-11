import { Personal } from "src/personal/entities/personal.entity";
import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Archivo {
    @PrimaryGeneratedColumn()
    id_archivo: number;

    @Column({
        type: "int",
        nullable: false
             })
    legajo_personal: number;

    @ManyToOne(type => Personal)
    @JoinColumn({
        referencedColumnName: "legajo",
        name: "legajo_personal"
    })
    personal: Personal;

    @Column({
        type: "varchar",
        nullable: false
           })
    nombre_archivo: string;

    @Column({
        type: "varchar",
        nullable: true
         })
    detalle: string;

    @Column({
        type: "int",
        nullable: true
             })
    indice : number;

    @Column({
        type: "date",
        nullable: false,
           })
    fecha_documento: Date;


    @CreateDateColumn()
    fecha_alta: Date;
 
    @UpdateDateColumn()
    ultima_actualizacion:Date;
 
    @DeleteDateColumn()
    fecha_baja: Date;
 
    
}
