import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { type } from 'node:os';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Proposta } from '../entity/proposta.entity';
import { CargaSevice } from './carga.service';

@Injectable()
export class PropostaService {
    constructor(
        private readonly cargaService: CargaSevice,
        @InjectRepository(Proposta)
        private readonly propostaRepository: Repository<Proposta>,
    ) {}

    async create(dto: CreatePropostaDto) {
        const consumoTotal = this.cargaService.consumoTotal(dto.cargas);

        const valorTotal = this.calculate(
            dto.fonte_energia,
            dto.sub_mercado,
            consumoTotal,
        );

        const cargas = await this.cargaService.create(dto.cargas);

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
        return proposta;
    }

    async update(id: Guid, updatePropostaDto: UpdatePropostaDto) {
        const cargas = updatePropostaDto.carga;

        await this.cargaService.update(cargas);

        const consumoTotal = this.cargaService.consumoTotal(cargas);

        const valotTotal = this.calculate(
            updatePropostaDto.fonte_energia,
            updatePropostaDto.sub_mercado,
            consumoTotal,
        );

        updatePropostaDto.valor_proposta = valotTotal;

        const proposta = await this.propostaRepository.preload({
            id_public: id.toString(),
            ...updatePropostaDto,
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
    async removeCarga(idProposta: Guid, idCarga: Guid) {
        const cargas = await this.cargaService.remove(idProposta, idCarga);
        const consumoTotal = await this.cargaService.consumoTotal(cargas);
        console.log(consumoTotal);
        let oldProposta = await this.propostaRepository.findOne(
            idProposta.toString(),
        );
        console.log(oldProposta);
        const valorTotal = await this.calculate(
            oldProposta.fonte_energia,
            oldProposta.sub_mercado,
            consumoTotal,
        );
        const newProposta = new UpdatePropostaDto(
            oldProposta.data_inicio,
            oldProposta.data_fim,
            oldProposta.fonte_energia,
            oldProposta.sub_mercado,
            valorTotal,
            cargas,
        );
        const proposta = await this.propostaRepository.preload({
            id_public: idProposta.toString(),
            ...newProposta,
        });
        return this.propostaRepository.save(proposta);
    }

    calculate(font: string, sub_market: string, total_consume: number) {
        let sub_market_value: number;
        let font_value: number;
        let total_value: number;
        switch (sub_market) {
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

        total_value = total_consume * 10 + (sub_market_value + font_value);

        return total_value;
    }
}
