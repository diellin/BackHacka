import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Grupo } from "../../grupo/entities/grupo.entity";


@Entity({ name: "tb_turmas"})
export class Turma {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @MaxLength(250)
    @Column({ length: 1000, nullable: false})
    @ApiProperty()
    descricao: string;
    
    @IsNotEmpty()
    @Column({ default: true})
    @ApiProperty()
    isAtivo: boolean;

    
    @ApiProperty({type: () => Grupo})
    @OneToMany(() => Grupo, (grupo) => grupo.turma)
    grupo: Grupo[]

 
 
} 
