import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de Division (Requisa, Procesamiento de Datos, etc)
 */
@Entity()
export class  Division {

    @PrimaryGeneratedColumn()
    id_division: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
           })
    division: string;
    
    @Column({
        type: "int",
        nullable: true
    })
    departamento_id: number;
        }