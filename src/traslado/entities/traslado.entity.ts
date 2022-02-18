import { Destino } from "src/destino/entities/destino.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('traslado')
export class  Traslado {

    @PrimaryGeneratedColumn()
    id_traslado: number;

    @Column({
        type: "int",
        unsigned: true
             })
    dni_personal: number;

    @Column({
        type: "int"
           })
    legajo: number;

    //DESTINO
    @Column({
        type: "int",
             })
    destino_id: number;

    @ManyToOne(type => Destino, {eager: true})
    @JoinColumn({
        name: 'destino_id',
        referencedColumnName: 'id_destino'
    })
    destino: Destino;
    //FIN DESTINO


    @Column({
        type: "date",
        nullable: false,
           })
    fecha: Date;

    @Column({
        type: "varchar",
        length: 100,
    })
    instrumento: string;

    @Column({
        type: "int",
        
    })
    fojas: number;    

    
    @Column({
        type: "boolean",
            })
    vigente: boolean;

    @Column({
        type: "boolean",
            })
    confirmado: boolean;


   @CreateDateColumn()
   fecha_alta: Date;

   @UpdateDateColumn()
   ultima_actualizacion:Date;

   @DeleteDateColumn()
   fecha_baja: Date;

}