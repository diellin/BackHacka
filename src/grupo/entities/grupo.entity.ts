import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Projeto } from "../../projeto/entities/projeto.entity";
import { Turma } from "../../turma/entities/turma.entity";


@Entity({ name: "tb_grupos"})
export class Grupo {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({ length: 100, nullable: false})
    @ApiProperty()
    numeroGrupo: string;

    @IsNotEmpty() 
    @MaxLength(1000)
    @Column({ length: 1000, nullable: false})
    @ApiProperty()
    maisInfos: string;

    
    @ApiProperty({type: () => Projeto})
    @OneToMany(() => Projeto, (projeto) => projeto.grupo)
    projeto: Projeto[]

    @ApiProperty({type: () => Turma})
    @ManyToOne(() => Turma, (turma) => turma.grupo, {
        onDelete: "CASCADE" 
       })
    turma: Turma
 
} 