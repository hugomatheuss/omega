import { ApiProperty } from '@nestjs/swagger';

export class CreateCargaDto {

  @ApiProperty({ example: 'Empresa Nome' , description: 'Empresa contratante', type: () => String })
  public nome_empresa: string

  @ApiProperty({ example: '150', description: 'Consumo em KW/H', type: () => Number })
  public consumo_kwh: number
}