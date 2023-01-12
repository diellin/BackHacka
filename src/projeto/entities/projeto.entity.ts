import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Grupo } from '../../grupo/entities/grupo.entity';


@Entity({ name: "tb_projetos" })
export class Projeto {

       @ApiProperty()
       @PrimaryGeneratedColumn()
       id: number;

       @IsNotEmpty()
       @MaxLength(100)
       @Column({ length: 100, nullable: false })
       @ApiProperty()
       nomeProjeto: string;

       @MaxLength(3000)
       @Column({ length: 3000, nullable: false })
       @ApiProperty()
       logoProjeto: string

       @IsNotEmpty()
       @MaxLength(3000)
       @Column({ length: 3000, nullable: false })
       @ApiProperty()
       linkProjeto: string

       @IsNotEmpty()
       @MaxLength(2000)
       @Column( { length: 2000, nullable: false} )
       @ApiProperty()
       @MaxLength(2000)
       pitProjeto: string
      

       @ApiProperty({type: () => Grupo})
       @ManyToOne(() => Grupo, (grupo) => grupo.projeto, {
        onDelete: "CASCADE" 
       })
       grupo: Grupo

}
