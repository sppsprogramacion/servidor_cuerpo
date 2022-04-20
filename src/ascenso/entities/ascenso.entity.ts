import { Personal } from "src/personal/entities/personal.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Grado } from '../../grado/entities/grado.entity';
import { Escalafon } from '../../escalafon/entities/escalafon.entity';

@Entity('ascenso')
export class Ascenso {
    @PrimaryGeneratedColumn()
    id_ascenso: number;

    @Column({
        type: "int",
        unsigned: true
             })
    dni_personal: number;

    @Column({
        type: "int"
           })
    legajo: number;

    @ManyToOne(type => Personal,{eager : true})
    @JoinColumn({
        name : 'legajo',
        referencedColumnName : 'legajo'
    })
    personal : Personal;

    //GRADO
    @Column({
        type: "int",
             })
    grado_id: number;

    @ManyToOne(type => Grado, {eager: true})
    @JoinColumn({
        name: 'grado_id',
        referencedColumnName: 'id_grado'
    })
    grado: Grado;
    //FIN GRADO

    //ESCALAFON
    @Column({
        type: "int",
             })
    escalafon_id: number;

    @ManyToOne(type => Escalafon, {eager: true})
    @JoinColumn({
        name: 'escalafon_id',
        referencedColumnName: 'id_escalafon'
    })
    escalafon: Escalafon;
    //FIN ESCALAFON
    
    @Column({
        type: "date",
        nullable: false,
           })
    fecha_ascenso: Date;

    @Column({
        type: "varchar",
        length: 100,
    })
    instrumento: string;
    
    @Column({
        type: "boolean",
            })
    vigente: boolean;

    @Column({
        type: "int"
           })
    orden: number;

    @Column({
        type: "int"
           })
    anio: number;

    @Column({
        type: "varchar",
        length: 100,
    })
    instrumento_orden: string;

    @Column({
        type: "date",
        nullable: false,
           })
    fecha_instrumento_orden: Date;

    
   @CreateDateColumn()
   fecha_alta: Date;

   @UpdateDateColumn()
   ultima_actualizacion:Date;

   @DeleteDateColumn()
   fecha_baja: Date;
}
