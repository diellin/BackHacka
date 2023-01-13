import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Grupo } from "../entities/grupo.entity";

@Injectable()
export class GrupoService {

    constructor(
        @InjectRepository(Grupo)
        private grupoRepository: Repository<Grupo>
    ) { }

    async findAll(): Promise<Grupo[]> {
        return await this.grupoRepository.find({
            relations: {
                projeto: true,
                turma: true
            }

        })
    }

    async findById(id: number): Promise<Grupo> {

        let grupo = await this.grupoRepository.findOne({
            where: {
                id
            },
            relations: {
                projeto: true,
                turma:true
            }

        })

        if (!grupo)
            throw new HttpException('Grupo não existe!', HttpStatus.NOT_FOUND)

        return grupo
    }

    async create(grupo: Grupo): Promise<Grupo> {
        return await this.grupoRepository.save(grupo)
    }

    async update(grupo: Grupo): Promise<Grupo> {
        let buscarGrupo = await this.findById(grupo.id)

        if (!buscarGrupo || !buscarGrupo.id)
            throw new HttpException('Grupo não existe!', HttpStatus.NOT_FOUND)

        return await this.grupoRepository.save(grupo)
    }


    async delete(id: number): Promise<DeleteResult> {
        let buscarGrupo = await this.findById(id)

        if (!buscarGrupo)
            throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND)

        return await this.grupoRepository.delete(id)
    }

}
