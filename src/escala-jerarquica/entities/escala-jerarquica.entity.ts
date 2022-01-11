import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de escala jerarquica (Oficial, suboficial, etc)
 */
@Entity()
export class  EscalaJerarquica {

    @PrimaryGeneratedColumn()
    id_escala_jerarquica: number;

    @Column({
        type: "varchar",
        length: 200,
        unique: true
           })
    escala_jerarquica: string;
        }