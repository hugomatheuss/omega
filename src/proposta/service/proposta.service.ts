import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Carga } from '../entity/carga.entity';
import { Proposta } from '../entity/proposta.entity';
import { CargaSevice } from './carga.service';

@Injectable()
export class PropostaService {
    constructor(
        private readonly cargaService: CargaSevice,
        @InjectRepository(Proposta)
        private readonly propostaRepository: Repository<Proposta>,
        @InjectRepository(Carga)
        private readonly cargaRepository: Repository<Carga>,
    ) {}

    readonly kw_value = 10;

    async create(dto: CreatePropostaDto) {
        const consumoTotal = this.cargaService.consumoTotal(dto.carga);

        const valorTotal = this.calculate(
            dto.sub_mercado,
            dto.fonte_energia,
            consumoTotal,
        );

        const cargas = await this.cargaService.create(dto.carga);

        const proposta = new Proposta(
            dto.data_inicio,
            dto.data_fim,
            dto.fonte_energia,
            dto.sub_mercado,
            valorTotal,
            cargas,
        );
        // salvo o objeto criado
        return this.propostaRepository.save(proposta);
    }

    findAll() {
        return this.propostaRepository.find();
    }

    async findOne(id: Guid) {
        const proposta = this.propostaRepository.findOne(id.toString());

        const cargas = await createQueryBuilder('proposta')
            .leftJoinAndSelect('proposta.carga', 'carga')
            .where('proposta.id_public = :id_public', {
                id_public: id.toString(),
            });

        console.log(cargas);
        console.log(proposta);
        return proposta;
    }

    async update(id: Guid, updatePropostaDto: UpdatePropostaDto) {
        this.cargaService.update(updatePropostaDto.carga);
        const proposta = await this.propostaRepository.preload({
            id_public: id.toString(),
            // ...updatePropostaDto,
        });

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }
        return this.propostaRepository.save(proposta);
    }

    async remove(id: Guid) {
        const proposta = await this.propostaRepository.findOne(id.toString());

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }
        return this.propostaRepository.remove(proposta);
    }

    calculate(sub_market: string, font: string, total_consume: number) {
        let sub_market_value: number;
        let font_value: number;
        let total_value: number;

        switch (sub_market.toUpperCase()) {
            case 'NORTE': {
                sub_market_value = 2;
                break;
            }
            case 'NORDESTE': {
                sub_market_value = -1;
                break;
            }
            case 'SUL': {
                sub_market_value = 3.5;
                break;
            }
            case 'SUDESTE': {
                sub_market_value = 1.5;
                break;
            }
        }

        font_value = font == 'CONVENCIONAL' ? 5 : -2;

        total_value =
            total_consume * this.kw_value + (sub_market_value + font_value);

        return total_value;
    }
}
