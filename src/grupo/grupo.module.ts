import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GrupoController } from "./controller/grupo.controller";
import { Grupo } from "./entities/grupo.entity";
import { GrupoService } from "./service/grupo.service";


@Module({
    imports: [TypeOrmModule.forFeature([Grupo])],
    providers:[GrupoService],
    controllers:[GrupoController],
    exports: [TypeOrmModule],

})
    export class GrupoModule { }