import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de nivel educativo (secundario, universitario, etc,...)
 */
@Entity()
export class  NivelEducativo {

    @PrimaryGeneratedColumn()
    id_nivel_educativo: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
           })
    nivel_educativo: string;
        }