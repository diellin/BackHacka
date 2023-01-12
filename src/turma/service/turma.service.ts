import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Turma } from "../entities/turma.entity";

@Injectable()
export class TurmaService {

    constructor(
        @InjectRepository(Turma)
        private turmaRepository: Repository<Turma>
    ) { }

    async findAll(): Promise<Turma[]> {
        return await this.turmaRepository.find({
            relations: {
                grupo: true
            }

        })
    }

    async findById(id: number): Promise<Turma> {

        let grupo = await this.turmaRepository.findOne({
            where: {
                id
            },
            relations: {
                grupo: true
            }

        })

        if (!grupo)
            throw new HttpException('Turma não existe!', HttpStatus.NOT_FOUND)

        return grupo
    }

    async create(turma: Turma): Promise<Turma> {
        return await this.turmaRepository.save(turma)
    }

    async update(turma: Turma): Promise<Turma> {
        let buscarTurma = await this.findById(turma.id)

        if (!buscarTurma || !buscarTurma.id)
            throw new HttpException('Turma não existe!', HttpStatus.NOT_FOUND)

        return await this.turmaRepository.save(turma)
    }


    async delete(id: number): Promise<DeleteResult> {
        let buscarTurma = await this.findById(id)

        if (!buscarTurma)
            throw new HttpException('Turma não encontrado!', HttpStatus.NOT_FOUND)

        return await this.turmaRepository.delete(id)
    }

}