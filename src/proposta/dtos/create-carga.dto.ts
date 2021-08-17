import { Carga } from '../entity/carga.entity';
import { Proposta } from '../entity/proposta.entity';

export class UpdateCargaDto {
    public id_public: string;
    public company: string;
    public consumo: number;
    public id_proposta: string;

    constructor(
        id_public: string,
        company: string,
        consumo: number,
        id_proposta: string,
    ) {
        this.id_public = id_public;
        this.company = company;
        this.consumo = consumo;
        this.id_proposta = id_proposta;
    }
}
