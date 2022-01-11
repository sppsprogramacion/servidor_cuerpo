import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de situacion de departamento (Vigilancia y Tratamiento, Seguridad Externa, etc)
 */
@Entity()
export class  Departamento {

    @PrimaryGeneratedColumn()
    id_departamento: number;

    @Column({
        type: "varchar",
        length: 200,
        unique: true
           })
    departamento: string;

    @Column({
        type: "int",
        nullable: true
    })
    destino_id: number;

        }