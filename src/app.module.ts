import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_gamedirty',
      entities: [Categoria, Produto],
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
    ProdutoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
