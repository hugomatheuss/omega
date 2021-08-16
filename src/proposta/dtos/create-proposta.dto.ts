import { Carga } from '../entity/carga.entity';

export class CreatePropostaDto {
    public data_inicio: Date;
    public data_fim: Date;
    public sub_mercado: string;
    public fonte_energia: string;
    public carga: Carga[];
}
