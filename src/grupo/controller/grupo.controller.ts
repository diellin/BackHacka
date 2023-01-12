import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { ApiTags } from "@nestjs/swagger";
import { Grupo } from "../entities/grupo.entity";
import { GrupoService } from "../service/grupo.service";

@ApiTags('Grupo')
@Controller('grupos')
export class GrupoController {
    constructor(private readonly grupoService: GrupoService) { }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Grupo[]> {
        return this.grupoService.findAll(); 
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Grupo> {
        return this.grupoService.findById(id)
    } 

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() grupo: Grupo): Promise<Grupo> {
        return this.grupoService.create(grupo)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() grupo: Grupo): Promise<Grupo> {
        return this.grupoService.update(grupo)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.grupoService.delete(id)
    }
}