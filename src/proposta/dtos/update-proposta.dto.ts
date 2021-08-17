import { Carga } from '../entity/carga.entity';
import { IsNotEmpty, IsString, IsDateString, IsArray, IsBoolean, IsIn } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropostaDto {
    @IsNotEmpty({ message: "Data inicial é obrigatória" })
    @IsDateString()
    @ApiProperty({ example: '2021-07-16', description: 'Data de criação da proposta', type: () => Date })
    public data_inicio: Date;

    @IsNotEmpty({ message: "Data final é obrigatória" })
    @IsDateString()
    @ApiProperty({ example: '2025-04-22', description: 'Data do fim da proposta', type: () => Date })
    public data_fim: Date;

    @IsBoolean()
    @ApiProperty({ example: 'true', description: 'Status da proposta', type: () => Boolean })
    public contratado: boolean;

    @IsNotEmpty({ message: "Submercado é obrigatório" })
    @IsString({ message: "Tem certeza que digitou o submercado corretamente?" })
    @IsIn(["NORTE", "NORDESTE", "SUL", "SUDESTE"])
    @ApiProperty({ example: 'NORDESTE', description: 'Divisões de submercados de energia', type: () => String })
    public sub_mercado: string;

    @IsNotEmpty({ message: "Fonte de energia é obrigatório" })
    @IsString({ message: "Tem certeza que digitou o submercado corretamente?" })
    @IsIn(["RENOVÁVEL", "CONVENCIONAL"])
    @ApiProperty({ example: 'RENOVÁVEL', description: 'Tipos de fontes de energia', type: () => String })
    public fonte_energia: string;

    @ApiProperty({ example: 'R$ 115.000,00', description: 'Valor total da proposta, calculado automaticamente ao preencher os campos: submercado, fonte de energia e cargas', type: () => String })
    public valor_proposta: number;

    @IsNotEmpty({ message: "Você deve adicionar pelo menos uma carga" })
    @IsArray()
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
    public cargas: Carga[];
    constructor(
        data_inicio: Date,
        data_fim: Date,
        contratado: boolean,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        cargas: Carga[],
    ) {
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.contratado = contratado;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
        this.cargas = cargas;
    }
}
