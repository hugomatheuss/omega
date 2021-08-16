import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';
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
        return this.propostaRepository.save(proposta)
    }

    findAll(): Promise<Proposta[]> {
        return this.propostaRepository.find();
    }

    async findOne(id: Guid) {
        const proposta = this.propostaRepository.findOne(id.toString());

        return proposta;
    }

    async update(id: Guid, updatePropostaDto: UpdatePropostaDto) {
        const cargas = updatePropostaDto.cargas;

        await this.cargaService.update(cargas, id.toString());

        const consumoTotal = this.cargaService.consumoTotal(cargas);

        const valorTotal = this.calculate(
            updatePropostaDto.fonte_energia,
            updatePropostaDto.sub_mercado,
            consumoTotal,
        );

        updatePropostaDto.valor_proposta = valorTotal;

        const proposta = await this.propostaRepository.preload({
            id_public: id.toString(),
            ...updatePropostaDto,
        });

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }

        return this.propostaRepository.save(proposta);
    }

    async remove(id: Guid): Promise<any> {
        const proposta = await this.propostaRepository.findOne(id.toString());

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }
        return this.propostaRepository.delete(proposta);
    }

    async removeCarga(idProposta: Guid, idCarga: Guid) {
        const cargas = await this.cargaService.remove(idProposta, idCarga);
        const consumoTotal = await this.cargaService.consumoTotal(cargas);
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
        this.propostaRepository.save(proposta);
    }

    calculate(fonte: string, sub_mercado: string, consumo_total: number) {
        let valor_sub_mercado: number;
        let valor_fonte: number;
        let valor_total: number;

        switch (sub_mercado.toUpperCase()) {
            case "NORTE": {
                valor_sub_mercado = 2;
                break;
            }
            case "NORDESTE": {
                valor_sub_mercado = -1;
                break;
            }
            case "SUL": {
                valor_sub_mercado = 3.5;
                break;
            }
            case "SUDESTE": {
                valor_sub_mercado = 1.5;
                break;
            }
        }

        valor_fonte = fonte.toUpperCase() == 'CONVENCIONAL' ? 5 : -2;
        valor_total = consumo_total * 10 + (valor_sub_mercado + valor_fonte);
        return valor_total;
    }
}
