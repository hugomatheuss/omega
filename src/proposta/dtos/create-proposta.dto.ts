import { Carga } from '../entity/carga.entity';

export class CreatePropostaDto {
    data_inicio: Date;
    data_fim: Date;
    sub_mercado: string;
    fonte_energia: string;
    carga: Carga[];
}
