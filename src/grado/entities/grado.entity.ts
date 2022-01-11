import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de grado (cabo, sargento, alcaide, etc)
 */
@Entity()
export class  Grado {

    @PrimaryGeneratedColumn()
    id_grado: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
           })
    grado: string;

    @Column({
        type: "int",
            })
    escala_jerarquica_id : number;

    @Column({
        type: "int",
            })
    jerarquia_id : number;

        }