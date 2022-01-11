import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de estado civil (casado, soltero,...)
 */

 @Entity()
export class EstadoCivil {
    
    @PrimaryGeneratedColumn()
    id_estado_civil: number;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    estado_civil: string;
}