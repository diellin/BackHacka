import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Grupo } from './grupo/entities/grupo.entity';
import { Projeto } from './projeto/entities/projeto.entity';
import { Turma } from './turma/entities/turma.entity';
import { GrupoModule } from './grupo/grupo.module';
import { TurmaModule } from './turma/turma.module';
import { ProjetoModule } from './projeto/projeto.module';



@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'db_projetohackathon',
    //   entities: [Projeto, Grupo, Turma],
    //   synchronize: true
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProjetoModule,
    GrupoModule,
    TurmaModule 
    
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule { }