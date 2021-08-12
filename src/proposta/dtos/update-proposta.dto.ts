export class UpdatePropostaDto {
  public data_inicio: Date
  public data_fim: Date
  public contratado: boolean
  public fonte_energia: string
  public sub_mercado: string
  public valor_proposta: string
  public cargas: string[]
}