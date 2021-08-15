import { Carga } from '../entity/carga.entity';
import { Proposta } from '../entity/proposta.entity';

export class UpdateCargaDto extends Carga {
    public id_publico: string;
    public company: string;
    public consumo: number;
    public proposta: Proposta;
    constructor(
        id_public: string,
        company: string,
        consumo: number,
        proposta: Proposta,
    ) {
        super(company, consumo);
        this.id_public = id_public;
        this.proposta = proposta;
    }
}
