import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de jerarquia (suboficial superior, tropa,oficial superior,...)
 */
@Entity()
export class  Jerarquia {

    @PrimaryGeneratedColumn()
    id_jerarquia: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
           })
    jerarquia: string;
        }