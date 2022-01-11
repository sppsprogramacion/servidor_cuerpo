import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Municipio } from '../../municipio/entities/municipio.entity';

/**
 * Tabla que contiene las opciones de ciudad (salta, Venado Tuerto, etc,...)
 */
@Entity()
export class Ciudad {

    @PrimaryGeneratedColumn()
    id_ciudad: number;

    @Column({
        type: "varchar",
        length: 200,
        unique: true
           })
    ciudad: string;

    @Column({
        type: "int",
           })
    municipio_id: number;

    @ManyToOne(type => Municipio)
    @JoinColumn({
        name: "municipio_id",
        referencedColumnName: "id_municipio"
    })
    municipio: Municipio

    @Column({
        type: "int",
           })
    provincia_id: number;
        }