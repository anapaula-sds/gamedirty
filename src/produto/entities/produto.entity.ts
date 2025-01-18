import { Transform, TransformFnParams } from "class-transformer"
import { IsDecimal, IsNotEmpty, IsString } from "class-validator"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity"


@Entity({ name: 'tb_produtos' }) //CREATE TABLE tb_produtos();
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string

    @IsNotEmpty()
    @IsDecimal()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    preco: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) 
    @IsNotEmpty() 
    @IsString() 
    @Column({ type: 'varchar', length: 255, nullable: false }) 
    imagemJogo: string; 

    // Chave estrangeira para a tabela Categoria
    @ManyToOne(() => Categoria, (categoria) => categoria.id) // Definindo o relacionamento com a entidade Categoria
    @JoinColumn({ name: 'categoria_id' }) // Definindo o nome da coluna que vai armazenar o ID da categoria
    categoria: Categoria;
}
