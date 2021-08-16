import { Carga } from '../entity/carga.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropostaDto {
    @ApiProperty({ description: 'Data de criação da proposta', type: () => Date })
    public data_inicio: Date;

    @ApiProperty({ description: 'Data do fim da proposta', type: () => Date })
    public data_fim: Date;

    @ApiProperty({ example: 'NORDESTE', description: 'Divisões de submercados de energia', type: () => String })
    public sub_mercado: string;

    @ApiProperty({ example: 'RENOVÁVEL', description: 'Tipos de fontes de energia', type: () => String })
    public fonte_energia: string;

    public valor_proposta: number;

    @ApiProperty({
        description: 'Cargas vinculadas à proposta', type: 'array',
        items: {
            type: 'array',
            items: {
                type: 'object',
                items: {
                    type: 'string'
                }
            }
        },
    })
    public carga: Carga[];
    constructor(
        data_inicio: Date,
        data_fim: Date,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        carga: Carga[],
    ) {
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
        this.carga = carga;
    }
}
