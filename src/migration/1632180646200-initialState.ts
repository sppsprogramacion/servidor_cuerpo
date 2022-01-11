import {MigrationInterface, QueryRunner} from "typeorm";

export class initialState1632180646200 implements MigrationInterface {
    name = 'initialState1632180646200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `departamento` (`id_departamento` int NOT NULL AUTO_INCREMENT, `departamento` varchar(200) NOT NULL, `destino_id` int NULL, UNIQUE INDEX `IDX_32823d2c75aa9978b9386f77aa` (`departamento`), PRIMARY KEY (`id_departamento`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `destino` (`id_destino` int NOT NULL AUTO_INCREMENT, `destino` varchar(200) NOT NULL, UNIQUE INDEX `IDX_653090fe865ddc04e575e1bcd8` (`destino`), PRIMARY KEY (`id_destino`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `division` (`id_division` int NOT NULL AUTO_INCREMENT, `division` varchar(100) NOT NULL, `departamento_id` int NULL, UNIQUE INDEX `IDX_c409dc4a33d325a551efb52f9b` (`division`), PRIMARY KEY (`id_division`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sector` (`id_sector` int NOT NULL AUTO_INCREMENT, `sector` varchar(200) NOT NULL, `division_id` int NULL, UNIQUE INDEX `IDX_74278d3bc5c5718bc775977d53` (`sector`), PRIMARY KEY (`id_sector`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sexo` (`id_sexo` int NOT NULL AUTO_INCREMENT, `sexo` varchar(50) NOT NULL, UNIQUE INDEX `IDX_bd706fd8563b079184158e1e8e` (`sexo`), PRIMARY KEY (`id_sexo`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `estado_civil` (`id_estado_civil` int NOT NULL AUTO_INCREMENT, `estado_civil` varchar(50) NOT NULL, UNIQUE INDEX `IDX_9a98a7bf3dd7858929bf087a1f` (`estado_civil`), PRIMARY KEY (`id_estado_civil`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `seccion_guardia` (`id_seccion` int NOT NULL AUTO_INCREMENT, `seccion` varchar(200) NOT NULL, `departamento_id` int NULL, UNIQUE INDEX `IDX_cdfd3a429d0b569b3dd6069b52` (`seccion`), PRIMARY KEY (`id_seccion`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `escalafon` (`id_escalafon` int NOT NULL AUTO_INCREMENT, `escalafon` varchar(200) NOT NULL, UNIQUE INDEX `IDX_2e012bcbc12b2141b165bfc9ca` (`escalafon`), PRIMARY KEY (`id_escalafon`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `escala_jerarquica` (`id_escala_jerarquica` int NOT NULL AUTO_INCREMENT, `escala_jerarquica` varchar(200) NOT NULL, UNIQUE INDEX `IDX_88d3838034131e06dcf593407f` (`escala_jerarquica`), PRIMARY KEY (`id_escala_jerarquica`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `grado` (`id_grado` int NOT NULL AUTO_INCREMENT, `grado` varchar(100) NOT NULL, `escala_jerarquica_id` int NOT NULL, `jerarquia_id` int NOT NULL, UNIQUE INDEX `IDX_1b43f2703e13fa13cef38be6f8` (`grado`), PRIMARY KEY (`id_grado`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `provincia` (`id_provincia` int NOT NULL AUTO_INCREMENT, `provincia` varchar(100) NOT NULL, PRIMARY KEY (`id_provincia`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ciudad` (`id_ciudad` int NOT NULL AUTO_INCREMENT, `ciudad` varchar(200) NOT NULL, `municipio_id` int NOT NULL, `provincia_id` int NOT NULL, UNIQUE INDEX `IDX_19cf5471bdb29ad98b5e2e221f` (`ciudad`), PRIMARY KEY (`id_ciudad`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `municipio` (`id_municipio` int NOT NULL AUTO_INCREMENT, `municipio` varchar(200) NOT NULL, `provincia_id` int NOT NULL, `departamento_id` int NOT NULL, PRIMARY KEY (`id_municipio`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `departamento_provincial` (`id_dpto_prov` int NOT NULL AUTO_INCREMENT, `departamento_provincial` varchar(50) NOT NULL, `provincia_id` int NOT NULL, PRIMARY KEY (`id_dpto_prov`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `nivel_educativo` (`id_nivel_educativo` int NOT NULL AUTO_INCREMENT, `nivel_educativo` varchar(100) NOT NULL, UNIQUE INDEX `IDX_e3f596d6b3518c25e306623154` (`nivel_educativo`), PRIMARY KEY (`id_nivel_educativo`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `situacion` (`id_situacion` int NOT NULL AUTO_INCREMENT, `situacion` varchar(100) NOT NULL, UNIQUE INDEX `IDX_2448ff81232927bfefe598377e` (`situacion`), PRIMARY KEY (`id_situacion`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `personal` (`id_personal` int NOT NULL AUTO_INCREMENT, `apellido_1` varchar(50) NOT NULL, `apellido_2` varchar(50) NULL, `nombre_1` varchar(50) NOT NULL, `nombre_2` varchar(50) NULL, `nombre_3` varchar(50) NULL, `dni` int UNSIGNED NOT NULL, `fecha_nacimiento` date NULL, `fecha_ingreso` date NULL, `ultimo_ascenso` date NULL, `legajo` int NOT NULL, `cuil` varchar(50) NULL, `sexo_id` int NOT NULL, `estado_civil_id` int NOT NULL, `destino_id` int NOT NULL DEFAULT '8', `departamento_id` int NOT NULL DEFAULT '3', `division_id` int NOT NULL DEFAULT '5', `sector_id` int NOT NULL DEFAULT '1', `seccion_guardia_id` int NOT NULL DEFAULT '1', `funcion` varchar(200) NULL, `escalafon_id` int NOT NULL, `escala_jerarquica_id` int NOT NULL, `grado_id` int NOT NULL, `nacionalidad` varchar(30) NOT NULL DEFAULT 'argentina', `domicilio` varchar(300) NULL, `provincia_id` int NOT NULL, `departamento_provincial_id` int NOT NULL, `municipio_id` int NOT NULL, `ciudad_id` int NOT NULL, `telefonos` varchar(300) NULL, `email` varchar(50) NULL, `altura` decimal(3,2) NULL DEFAULT '0.00', `peso` decimal(5,2) NULL DEFAULT '0.00', `nivel_educativo_id` int NOT NULL, `registrado_por` int NULL, `situacion_id` int NOT NULL, `foto` varchar(100) NULL DEFAULT 'no-image.png', `detalles` varchar(255) NULL, `fecha_alta` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ultima_actualizacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `fecha_baja` datetime(6) NULL, UNIQUE INDEX `IDX_7cd67e66979a904324a56a1700` (`dni`), UNIQUE INDEX `IDX_1fb2ba5af8633f12aefced7656` (`legajo`), UNIQUE INDEX `IDX_a1783b741f5ed23c89e702dd66` (`cuil`), PRIMARY KEY (`id_personal`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `archivo` (`id_archivo` int NOT NULL AUTO_INCREMENT, `legajo_personal` int NOT NULL, `nombre_archivo` varchar(255) NOT NULL, `detalle` varchar(255) NULL, `indice` int NULL, `fecha_documento` date NOT NULL, `fecha_alta` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ultima_actualizacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `fecha_baja` datetime(6) NULL, PRIMARY KEY (`id_archivo`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `jerarquia` (`id_jerarquia` int NOT NULL AUTO_INCREMENT, `jerarquia` varchar(100) NOT NULL, UNIQUE INDEX `IDX_3636bb5cf3e7388edd50975aa0` (`jerarquia`), PRIMARY KEY (`id_jerarquia`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios` (`id_usuario` int NOT NULL AUTO_INCREMENT, `correo` varchar(50) NOT NULL, `clave` varchar(255) NOT NULL, `dni` int UNSIGNED NOT NULL, `nombre` varchar(50) NOT NULL, `apellido` varchar(50) NOT NULL, `img` varchar(100) NULL DEFAULT 'no-image.jpg', `destino_id` int NOT NULL, `fecha_alta` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ultima_actualizacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `fecha_baja` datetime(6) NULL, `role` enum ('0', '1', '2') NULL DEFAULT '2', UNIQUE INDEX `IDX_63665765c1a778a770c9bd585d` (`correo`), PRIMARY KEY (`id_usuario`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `ciudad` ADD CONSTRAINT `FK_d217238693f43e91b11f91812b5` FOREIGN KEY (`municipio_id`) REFERENCES `municipio`(`id_municipio`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `municipio` ADD CONSTRAINT `FK_6accf878eabee6288f124fa1bf2` FOREIGN KEY (`departamento_id`) REFERENCES `departamento_provincial`(`id_dpto_prov`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `departamento_provincial` ADD CONSTRAINT `FK_82043721584e3286333deb91462` FOREIGN KEY (`provincia_id`) REFERENCES `provincia`(`id_provincia`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_d8cb91f5ad4553119f546eb5901` FOREIGN KEY (`sexo_id`) REFERENCES `sexo`(`id_sexo`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_0f3b7cf803db3a5ae8ab7fc5c90` FOREIGN KEY (`estado_civil_id`) REFERENCES `estado_civil`(`id_estado_civil`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_d3579abb733a154b851a3f0b21d` FOREIGN KEY (`destino_id`) REFERENCES `destino`(`id_destino`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_0158ddfdae638754a13b4e2a15d` FOREIGN KEY (`departamento_id`) REFERENCES `departamento`(`id_departamento`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_f8aa308c33d9393d73267c89e76` FOREIGN KEY (`division_id`) REFERENCES `division`(`id_division`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_5233cb268fc7ca308b02f6b6dbe` FOREIGN KEY (`sector_id`) REFERENCES `sector`(`id_sector`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_95112ed8eed6d82a7808cf2bd60` FOREIGN KEY (`seccion_guardia_id`) REFERENCES `seccion_guardia`(`id_seccion`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_311bfd5f8f4b8875115623dace1` FOREIGN KEY (`escalafon_id`) REFERENCES `escalafon`(`id_escalafon`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_3570a8bf59c83ece8b2ece78c77` FOREIGN KEY (`escala_jerarquica_id`) REFERENCES `escala_jerarquica`(`id_escala_jerarquica`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_62d10fa62eb147d43559986edc0` FOREIGN KEY (`grado_id`) REFERENCES `grado`(`id_grado`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_636352dc4d3289a97f34cb67554` FOREIGN KEY (`provincia_id`) REFERENCES `provincia`(`id_provincia`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_5e7ea0bb9e19e1102f4d68268c3` FOREIGN KEY (`departamento_provincial_id`) REFERENCES `departamento_provincial`(`id_dpto_prov`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_77122de652fa9a2be38c2d20475` FOREIGN KEY (`municipio_id`) REFERENCES `municipio`(`id_municipio`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_8259fd4ea262baabfa9508f7c53` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudad`(`id_ciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_9f8d739201bd22997ed4f8d9cdf` FOREIGN KEY (`nivel_educativo_id`) REFERENCES `nivel_educativo`(`id_nivel_educativo`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_d332ec366813fb1dbe7d3aa2002` FOREIGN KEY (`situacion_id`) REFERENCES `situacion`(`id_situacion`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `archivo` ADD CONSTRAINT `FK_19888e7e5887bf088c10e0d9913` FOREIGN KEY (`legajo_personal`) REFERENCES `personal`(`legajo`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_991b66ab13f14bef5cdc67594d1` FOREIGN KEY (`destino_id`) REFERENCES `destino`(`id_destino`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_991b66ab13f14bef5cdc67594d1`");
        await queryRunner.query("ALTER TABLE `archivo` DROP FOREIGN KEY `FK_19888e7e5887bf088c10e0d9913`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_d332ec366813fb1dbe7d3aa2002`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_9f8d739201bd22997ed4f8d9cdf`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_8259fd4ea262baabfa9508f7c53`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_77122de652fa9a2be38c2d20475`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_5e7ea0bb9e19e1102f4d68268c3`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_636352dc4d3289a97f34cb67554`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_62d10fa62eb147d43559986edc0`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_3570a8bf59c83ece8b2ece78c77`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_311bfd5f8f4b8875115623dace1`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_95112ed8eed6d82a7808cf2bd60`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_5233cb268fc7ca308b02f6b6dbe`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_f8aa308c33d9393d73267c89e76`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_0158ddfdae638754a13b4e2a15d`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_d3579abb733a154b851a3f0b21d`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_0f3b7cf803db3a5ae8ab7fc5c90`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_d8cb91f5ad4553119f546eb5901`");
        await queryRunner.query("ALTER TABLE `departamento_provincial` DROP FOREIGN KEY `FK_82043721584e3286333deb91462`");
        await queryRunner.query("ALTER TABLE `municipio` DROP FOREIGN KEY `FK_6accf878eabee6288f124fa1bf2`");
        await queryRunner.query("ALTER TABLE `ciudad` DROP FOREIGN KEY `FK_d217238693f43e91b11f91812b5`");
        await queryRunner.query("DROP INDEX `IDX_63665765c1a778a770c9bd585d` ON `usuarios`");
        await queryRunner.query("DROP TABLE `usuarios`");
        await queryRunner.query("DROP INDEX `IDX_3636bb5cf3e7388edd50975aa0` ON `jerarquia`");
        await queryRunner.query("DROP TABLE `jerarquia`");
        await queryRunner.query("DROP TABLE `archivo`");
        await queryRunner.query("DROP INDEX `IDX_a1783b741f5ed23c89e702dd66` ON `personal`");
        await queryRunner.query("DROP INDEX `IDX_1fb2ba5af8633f12aefced7656` ON `personal`");
        await queryRunner.query("DROP INDEX `IDX_7cd67e66979a904324a56a1700` ON `personal`");
        await queryRunner.query("DROP TABLE `personal`");
        await queryRunner.query("DROP INDEX `IDX_2448ff81232927bfefe598377e` ON `situacion`");
        await queryRunner.query("DROP TABLE `situacion`");
        await queryRunner.query("DROP INDEX `IDX_e3f596d6b3518c25e306623154` ON `nivel_educativo`");
        await queryRunner.query("DROP TABLE `nivel_educativo`");
        await queryRunner.query("DROP TABLE `departamento_provincial`");
        await queryRunner.query("DROP TABLE `municipio`");
        await queryRunner.query("DROP INDEX `IDX_19cf5471bdb29ad98b5e2e221f` ON `ciudad`");
        await queryRunner.query("DROP TABLE `ciudad`");
        await queryRunner.query("DROP TABLE `provincia`");
        await queryRunner.query("DROP INDEX `IDX_1b43f2703e13fa13cef38be6f8` ON `grado`");
        await queryRunner.query("DROP TABLE `grado`");
        await queryRunner.query("DROP INDEX `IDX_88d3838034131e06dcf593407f` ON `escala_jerarquica`");
        await queryRunner.query("DROP TABLE `escala_jerarquica`");
        await queryRunner.query("DROP INDEX `IDX_2e012bcbc12b2141b165bfc9ca` ON `escalafon`");
        await queryRunner.query("DROP TABLE `escalafon`");
        await queryRunner.query("DROP INDEX `IDX_cdfd3a429d0b569b3dd6069b52` ON `seccion_guardia`");
        await queryRunner.query("DROP TABLE `seccion_guardia`");
        await queryRunner.query("DROP INDEX `IDX_9a98a7bf3dd7858929bf087a1f` ON `estado_civil`");
        await queryRunner.query("DROP TABLE `estado_civil`");
        await queryRunner.query("DROP INDEX `IDX_bd706fd8563b079184158e1e8e` ON `sexo`");
        await queryRunner.query("DROP TABLE `sexo`");
        await queryRunner.query("DROP INDEX `IDX_74278d3bc5c5718bc775977d53` ON `sector`");
        await queryRunner.query("DROP TABLE `sector`");
        await queryRunner.query("DROP INDEX `IDX_c409dc4a33d325a551efb52f9b` ON `division`");
        await queryRunner.query("DROP TABLE `division`");
        await queryRunner.query("DROP INDEX `IDX_653090fe865ddc04e575e1bcd8` ON `destino`");
        await queryRunner.query("DROP TABLE `destino`");
        await queryRunner.query("DROP INDEX `IDX_32823d2c75aa9978b9386f77aa` ON `departamento`");
        await queryRunner.query("DROP TABLE `departamento`");
    }

}
