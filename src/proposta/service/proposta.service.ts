import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Carga } from '../entity/carga.entity';
import { Proposta } from '../entity/proposta.entity';

@Injectable()
export class PropostaService {
    constructor(
        @InjectRepository(Proposta)
        private readonly propostaRepository: Repository<Proposta>,
        @InjectRepository(Carga)
        private readonly cargaRepository: Repository<Carga>,
    ) {}

    readonly kw_value = 10;

    async create(dto: CreatePropostaDto) {
        console.log(dto.carga);

        const consumoTotal = dto.carga
            .map((carga) => carga.consumo)
            .reduce((p, c) => {
                return p + c;
            });

        const valorTotal = this.calculate(
            dto.sub_mercado,
            dto.fonte_energia,
            consumoTotal,
        );
        const cargas = dto.carga.map((c) => {
            return new Carga(c.nome, c.consumo);
        });

        await this.cargaRepository.save(cargas);
        const proposta = new Proposta(
            dto.data_inicio,
            dto.data_fim,
            dto.fonte_energia,
            dto.sub_mercado,
            valorTotal,
            cargas,
        );
        console.log(proposta);

        // salvo o objeto criado
        return this.propostaRepository.save(proposta);
    }

    findAll() {
        return this.propostaRepository.find();
    }

    findOne(id: Guid) {
        const proposta = this.propostaRepository.findOne(id.toString());
        return proposta;
    }

    async update(id: Guid, updatePropostaDto: UpdatePropostaDto) {
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
