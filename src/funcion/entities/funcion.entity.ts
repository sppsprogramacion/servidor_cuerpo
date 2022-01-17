/**
 * Tabla que contiene las opciones de funciones (aux. administratitvo, ,...)
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Funcion {
    
    @PrimaryGeneratedColumn()
    id_funcion: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
           })
    funcion: string;

}