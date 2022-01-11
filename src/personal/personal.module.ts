import { Module } from '@nestjs/common';
import { Personal } from "./entities/personal.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Personal
        ]),
        CloudinaryModule
    ],
    controllers: [PersonalController],
    providers: [PersonalService],
    exports: [PersonalService]
})
export class PersonalModule {}
