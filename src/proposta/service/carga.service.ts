import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';
import { Carga } from '../entity/carga.entity';
import { Proposta } from '../entity/proposta.entity';

@Injectable()
export class CargaSevice {
    constructor(
        @InjectRepository(Carga)
        private readonly cargaRepository: Repository<Carga>,
    ) {}

    async create(carga: Carga[]) {
        const cargas = carga.map((c) => {
            return new Carga(c.nome_empresa, c.consumo_kwh);
        });
        await this.cargaRepository.save(cargas);
        return cargas;
    }

    async update(carga: Carga[], id_proposta: string) {
        const cargas = carga.map((c) => {
            this.cargaRepository.update(c.id_public, c);
        });
        return cargas;
    }

    async remove(idProposta: Guid, idCarga: Guid) {
        const carga = await this.cargaRepository.findOne(idCarga.toString());

        if (!carga) {
            throw new NotFoundException(`carga ID ${idCarga} not found`);
        }
        await this.cargaRepository.remove(carga);
        const cargas = await this.cargaRepository.find({
            where: { proposta: idProposta },
        });
        return cargas;
    }

    findAll() {}
    findOne() {}
    consumoTotal(carga: Carga[]) {
        const consumoTotal = carga
            .map((carga) => carga.consumo_kwh)
            .reduce((p, c) => {
                return +p + +c;
            });
        return consumoTotal;
    }
}
