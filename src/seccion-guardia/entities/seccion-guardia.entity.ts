import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de seccion (primera seccion, segunda seccion, etc)
 */
@Entity()
export class  SeccionGuardia {

    @PrimaryGeneratedColumn()
    id_seccion: number;

    @Column({
        type: "varchar",
        length: 200,
        unique: true
           })
    seccion: string;

    @Column({
       type: "int",
       nullable: true
    })
    departamento_id: number;
        }