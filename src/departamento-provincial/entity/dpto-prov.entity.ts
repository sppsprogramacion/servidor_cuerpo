import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Provincia } from '../../provincia/entities/provincia.entity';
import { Municipio } from '../../municipio/entities/municipio.entity';

/**
 * Tabla que contiene las opciones de estado civil (casado, soltero,...)
 */

 @Entity()
export class DepartamentoProvincial {
    
    @PrimaryGeneratedColumn()
    id_dpto_prov: number;

    @Column({
        type: "varchar",
        length: 50, 
          })
    departamento_provincial: string;

    @Column({
        type: "int",
        nullable: false
    })
    provincia_id: number;

    @ManyToOne(type => Provincia)
    @JoinColumn({
        name: "provincia_id",
        referencedColumnName: "id_provincia"
    })
    provincia: Provincia;

    @OneToMany(type => Municipio,muni => muni.departamento,{
        onDelete: "CASCADE",
        eager: true,
        cascade: true})
    municipios : Municipio[];

    
}