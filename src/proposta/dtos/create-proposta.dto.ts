import { Carga } from '../entity/carga.entity';
import { IsNotEmpty, IsString, IsDateString, IsArray, IsIn } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entity/usuario.entity';

export class CreatePropostaDto {
    @IsNotEmpty({ message: "Data inicial é obrigatória" })
    @IsDateString()
    @ApiProperty({ example: '2021-07-16', description: 'Data de criação da proposta', type: () => Date })
    public data_inicio: Date;

    @IsNotEmpty({ message: "Data final é obrigatória" })
    @IsDateString()
    @ApiProperty({ example: '2025-04-22', description: 'Data do fim da proposta', type: () => Date })
    public data_fim: Date;

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

    /* @IsNotEmpty({ message: "Proposta sem usuário" })
    public usuario: Usuario; */

    @IsNotEmpty({ message: "Você deve adicionar pelo menos uma carga" })
    @IsArray()
    @ApiProperty({
        description: 'Cargas vinculadas à proposta',
        type: () => Object,
    })
    public cargas: Carga[];
}
