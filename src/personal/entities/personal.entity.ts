import { Departamento } from "src/departamento/entities/departamento.entity";
import { Destino } from "src/destino/entities/destino.entity";
import { Division } from "src/division/entities/division.entity";
import { Sector } from "src/sector/entities/sector.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EstadoCivil } from '../../estado-civil/entities/estado-civil.entity';
import { SeccionGuardia } from '../../seccion-guardia/entities/seccion-guardia.entity';
import { Escalafon } from '../../escalafon/entities/escalafon.entity';
import { EscalaJerarquica } from "src/escala-jerarquica/entities/escala-jerarquica.entity";
import { Grado } from '../../grado/entities/grado.entity';
import { DepartamentoProvincial } from '../../departamento-provincial/entity/dpto-prov.entity';
import { Municipio } from '../../municipio/entities/municipio.entity';
import { Ciudad } from "../../ciudad/entities/ciudad.entity";
import { NivelEducativo } from '../../nivel-educativo/entities/nivel-educativo.entity';
import { Provincia } from '../../provincia/entities/provincia.entity';
import { Situacion } from '../../situacion/entities/situacion.entity';
import { Archivo } from "src/archivo/entities/archivo.entity";

/**
 * Tabla que contiene los datos de todo el personal penitenciario 
 */
@Entity('personal')
export class  Personal {

    @PrimaryGeneratedColumn()
    id_personal: number;

    @Column({
        type: "varchar",
        length: 50,
           })
    apellido_1: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    apellido_2: string;

    @Column({
        type: "varchar",
        length: 50,
           })
    nombre_1: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    nombre_2: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    nombre_3: string;

    @Column({
        type: "int",
        unsigned: true,
        unique: true
             })
    dni: number;

    @Column({
        type: "date",
        nullable: true,
           })
    fecha_nacimiento: Date;

    @Column({
        type: "date",
        nullable: true,
           })
    fecha_ingreso: Date;

    @Column({
        type: "date",
        nullable: true,
           })
    ultimo_ascenso: Date;

    @Column({
        type: "int",
        // unsigned: true,
        unique: true
           })
    legajo: number;

    @OneToMany(type => Archivo,archivo => archivo.personal,{
        eager: true,
        })
    pdfs: Archivo[]

    @Column({
        type: "varchar",
        length: 50,
        nullable: true,
        unique: true
           })
    cuil: string;

    @Column({
        type: "int",
          })
    sexo_id: number;

    @ManyToOne(type => Sexo,{eager : true})
    @JoinColumn({
        name : 'sexo_id',
        referencedColumnName : 'id_sexo'
    })
    sexo : Sexo;

    @Column({
        type: "int",
        //unsigned: true,
        // nullable: true
             })
    estado_civil_id: number;

    @ManyToOne(type => EstadoCivil,{eager: true})
    @JoinColumn({
        name: 'estado_civil_id',
        referencedColumnName: 'id_estado_civil'
    })
    estado_civil: EstadoCivil;

    @Column({
        type: "int",
        //el valor default 8 corresponde a "sin destino" si ese registro cambia debe corregirse este default
        default: 8,
             })
    destino_id: number;

    @ManyToOne(type => Destino, {eager: true})
    @JoinColumn({
        name: 'destino_id',
        referencedColumnName: 'id_destino'
    })
    destino: Destino;

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

    @Column({
        type: "varchar",
        length: 200,
        nullable: true
             })
    funcion : string;

    @Column({
        type: "int",
        nullable: false
             })
    escalafon_id : number;

    @ManyToOne(type => Escalafon, {eager: true})
    @JoinColumn({
        name: 'escalafon_id',
        referencedColumnName: 'id_escalafon'
    })
    escalafon: Escalafon

    @Column({
        type: "int",
        nullable: false
             })
    escala_jerarquica_id : number;

    @ManyToOne(type => EscalaJerarquica, {eager: true})
    @JoinColumn({
        name: 'escala_jerarquica_id',
        referencedColumnName: 'id_escala_jerarquica'
    })
    escala_jerarquica: EscalaJerarquica

    @Column({
        type: "int",
        nullable: false
             })
    grado_id : number;

    @ManyToOne(type => Grado, {eager: true})
    @JoinColumn({
        name: 'grado_id',
        referencedColumnName: 'id_grado'
    })
    grado: Grado

    @Column({
        type: "varchar",
        length: 30,
        default: "argentina",
        nullable: false
             })
    nacionalidad : string;

    @Column({
        type: "varchar",
        length: 300,
        nullable: true
             })
    domicilio : string;

    @Column({
        type: "int",
        nullable: false
             })
    provincia_id : number;

    @ManyToOne(type => Provincia,{eager: true})
    @JoinColumn({
        name: "provincia_id",
        referencedColumnName: "id_provincia"
    })
    provincia: Provincia;

    @Column({
        type: "int",
        nullable: false
             })
    departamento_provincial_id : number;

    @ManyToOne(type => DepartamentoProvincial,{eager: true})
    @JoinColumn({
        name: "departamento_provincial_id",
        referencedColumnName: "id_dpto_prov"
    })
    departamento_provincial: DepartamentoProvincial;

    @Column({
        type: "int",
        nullable: false
             })
    municipio_id : number;

    @ManyToOne(type => Municipio,{eager: true})
    @JoinColumn({
        name: "municipio_id",
        referencedColumnName: "id_municipio"
    })
    municipio: Municipio;

    @Column({
        type: "int",
        nullable: false
             })
    ciudad_id : number;

    @ManyToOne(type => Ciudad,{eager: true})
    @JoinColumn({
        name: "ciudad_id",
        referencedColumnName: "id_ciudad"
    })
    ciudad: Ciudad;

    @Column({
        type: "varchar",
        length: 300,
        nullable: true
             })
    telefonos : string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
             })
    email : string;

    @Column({
        type: "decimal",
        precision: 3,
        scale: 2,
        default: 0,
        nullable: true
    })
    altura: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0,
        nullable: true
    })
    peso: number;

    @Column({
        type: "int",
        nullable: false
             })
    nivel_educativo_id : number;

    @ManyToOne(type => NivelEducativo, {eager: true})
    @JoinColumn({
        name: 'nivel_educativo_id',
        referencedColumnName: 'id_nivel_educativo'
    })
    nivel_educativo: NivelEducativo;

    @Column({
        type: "int",
        nullable: true
            })
    registrado_por: number;

    @Column({
        type: "int",
        nullable: false
             })
    situacion_id : number;

    @ManyToOne(type => Situacion, {eager: true})
    @JoinColumn({
        name: 'situacion_id',
        referencedColumnName: 'id_situacion'
    })
    situacion: Situacion;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
        default: 'no-image.png'
           })
    foto: string;

    @Column({
        type: "varchar",
        nullable: true,
            })
    detalles: string;

   @CreateDateColumn()
   fecha_alta: Date;

   @UpdateDateColumn()
   ultima_actualizacion:Date;

   @DeleteDateColumn()
   fecha_baja: Date;
    

}