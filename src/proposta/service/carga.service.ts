import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCargaDto } from '../dtos/create-carga.dto';
import { Carga } from '../entity/carga.entity';

@Injectable()
export class CargaSevice {
    constructor(
        @InjectRepository(Carga)
        private readonly cargaRepository: Repository<Carga>,
    ) {}

    async create(carga: Carga[]) {
        const cargas = carga.map((c) => {
            return new Carga(c.nome, c.consumo);
        });
        await this.cargaRepository.save(cargas);
        return cargas;
    }
    async update(carga: Carga[]) {
        const cargas = carga.map((c) => {
            let carga: Carga = new UpdateCargaDto(
                c.id_public,
                c.nome,
                c.consumo,
                c.proposta,
            );
            this.cargaRepository.update(c.id_public, carga);
        });
    }

    remove() {}
    findAll() {}
    findOne() {}
    consumoTotal(carga: Carga[]) {
        const consumoTotal = carga
            .map((carga) => carga.consumo)
            .reduce((p, c) => {
                return p + c;
            });
        return consumoTotal;
    }
}
