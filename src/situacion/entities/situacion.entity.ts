import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de situacion de revista (activo, pasivo, etc)
 */
@Entity()
export class  Situacion {

    @PrimaryGeneratedColumn()
    id_situacion: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true    
           })
    situacion: string;
        }