import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DepartamentoProvincial } from '../../departamento-provincial/entity/dpto-prov.entity';

/**
 * Tabla que contiene las opciones de provincia (Salta, Catamarca,etc...)
 */
@Entity()
export class  Provincia {

    @PrimaryGeneratedColumn()
    id_provincia: number;

    @Column({
        type: "varchar",
        length: 100
           })
    provincia: string;

    @OneToMany(type => DepartamentoProvincial,departamento => departamento.provincia,{
        onDelete: "CASCADE",
        eager: true,
        cascade: true})
    departamentos : DepartamentoProvincial[];

    
        }
        