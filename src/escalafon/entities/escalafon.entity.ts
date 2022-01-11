import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de escalafon (penitenciario, profesional, etc)
 */
@Entity()
export class  Escalafon {

    @PrimaryGeneratedColumn()
    id_escalafon: number;

    @Column({
        type: "varchar",
        length: 200,
        unique: true
           })
    escalafon: string;
        }