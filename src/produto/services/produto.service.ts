import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) {}

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            
        });
    }

    async findById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findByNomeProduto(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
        })
    }

    
    async findByPrecoCrescente(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            order: {
                preco: 'ASC',
            },
        });
    }
    
    async findByPrecoDecrescente(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            order: {
                preco: 'DESC', 
            },
        });
    }
    
    async create(Produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(Produto);
    }

    async update(produto: Produto): Promise<Produto> {

        let buscaProduto = await this.findById(produto.id);

        if (!buscaProduto || !produto.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {

        let buscaProduto = await this.findById(id);

        if (!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.delete(id);
    }

    // Consulta: Produtos com preço maior que o valor informado
    async findByPrecoMaiorQue(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            
        });
    }

    // Consulta: Produtos com preço menor que o valor informado
    async findByPrecoMenorQue(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            
        });
    }
}