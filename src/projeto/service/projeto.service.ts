import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Projeto } from "../entities/projeto.entity";

@Injectable()
export class ProjetoService {
    constructor(
        @InjectRepository(Projeto)
        private projetoRepository: Repository<Projeto>
    ) { }

    async findAll(): Promise<Projeto[]> {
        return await this.projetoRepository.find({
            relations: {
                grupo: true,
            }
        })
    }

    async findById(id: number): Promise<Projeto> {

        let projeto = await this.projetoRepository.findOne({
            where: {
                id
            },
            relations: {
                grupo: true,
            }
        })

        if (!projeto)
            throw new HttpException('Projeto não existe!', HttpStatus.NOT_FOUND)

        return projeto
    }

    async create(projeto: Projeto): Promise<Projeto> {
        return await this.projetoRepository.save(projeto)
    }

    async update(projeto: Projeto): Promise<Projeto> {
        let buscarProjeto = await this.findById(projeto.id)

        if (!buscarProjeto || !projeto.id)
            throw new HttpException('Projeto não existe!', HttpStatus.NOT_FOUND)

        return await this.projetoRepository.save(projeto)
    }


    async delete(id: number): Promise<DeleteResult> {
        let buscarProjeto = await this.findById(id)

        if (!buscarProjeto)
            throw new HttpException('Projeto não encontrada!', HttpStatus.NOT_FOUND)

        return await this.projetoRepository.delete(id)
    }

}