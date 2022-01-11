import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de destino (uc1, uc2,...)
 */
@Entity()
export class  Destino {

    @PrimaryGeneratedColumn()
    id_destino: number;

    @Column({
        type: "varchar",
        length: 200, 
        unique: true
           })
    destino: string;
        }