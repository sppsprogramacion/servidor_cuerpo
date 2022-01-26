import { Departamento } from "src/departamento/entities/departamento.entity";
import { Destino } from "src/destino/entities/destino.entity";
import { Division } from "src/division/entities/division.entity";
import { Funcion } from "src/funcion/entities/funcion.entity";
import { SeccionGuardia } from "src/seccion-guardia/entities/seccion-guardia.entity";
import { Sector } from "src/sector/entities/sector.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PersonalFuncion {
    @PrimaryGeneratedColumn()
    id_personal_funcion: number;

    

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

    //DEPARTAMENTO
    @Column({
        type: "int",
        //el valor default 3 corresponde a "sin departamento" si ese registro cambia debe corregirse este default
        default: 3
            })
    departamento_id : number;

    @ManyToOne(type => Departamento, {eager: true})
    @JoinColumn({
        name: 'departamento_id',
        referencedColumnName: 'id_departamento'
    })
    departamento: Departamento
    //FIN DEPARTAMENTO

    //DIVISION
    @Column({
        type: "int",
        //el valor default 3 corresponde a "sin destino" si ese registro cambia debe corregirse este default
        default: 5
            })
    division_id : number;

    @ManyToOne(type => Division,{eager: true})
    @JoinColumn({
        name: "division_id",
        referencedColumnName: "id_division"
    })
    division: Division;
    //FIN DIVISION

    //SECTOR
    @Column({
        type: "int",
         //el valor default 1 corresponde a "sin sector" si ese registro cambia debe corregirse este default
         default: 1
            })
    sector_id : number;

    @ManyToOne(type => Sector, {eager: true})
    @JoinColumn({
        name: 'sector_id',
        referencedColumnName: 'id_sector'
    })
    sector: Sector;
    //FIN SECTOR

    //SECCION GUARDIA
    @Column({
        type: "int",
        //nullable: true,
         //el valor default 1 corresponde a "sin seccion" si ese registro cambia debe corregirse este default
         default: 1
             })
    seccion_guardia_id : number;

    @ManyToOne(type => SeccionGuardia, {eager: true})
    @JoinColumn({
        name: 'seccion_guardia_id',
        referencedColumnName: 'id_seccion'
    })
    seccion_guardia: SeccionGuardia
    //FIN SECCION GUARDIA

    //FUNCION
    @Column({
        type: "int",
          })
    funcion_id: number;

    @ManyToOne(type => Funcion,{eager : true})
    @JoinColumn({
        name : 'funcion_id',
        referencedColumnName : 'id_funcion'
    })
    funcion : Funcion;
    //FIN FUNCION


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


   @CreateDateColumn()
   fecha_alta: Date;

   @UpdateDateColumn()
   ultima_actualizacion:Date;

   @DeleteDateColumn()
   fecha_baja: Date;

}
