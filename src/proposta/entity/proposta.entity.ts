import { Guid } from 'guid-typescript'
import { Entity, Column } from 'typeorm';
import { Entity as BaseEntity } from "src/shared/base.entity";

@Entity({ name: 'proposta' })
export class Proposta extends BaseEntity {
  @Column({ type: 'timestamptz' })
  private data_inicio: Date
  
  @Column({ type: 'timestamptz' })
  private data_fim: Date

  @Column({ type: 'boolean' })
  private contratado: boolean

  @Column({ type: 'varchar', length: 12 })
  private fonte_energia: string

  @Column({ type: 'varchar', length: 7})
  private sub_mercado: string

  @Column({ type: 'numeric' })
  private valor_proposta: number

  @Column({ type: 'varchar' })
  private user: Guid

  constructor(data_inicio: Date, data_fim: Date, contratado: boolean, fonte_energia: string, sub_mercado: string, valor_proposta: number, user: Guid) {
    super()
    this.data_inicio = data_inicio
    this.data_fim = data_fim
    this.contratado = contratado
    this.fonte_energia = fonte_energia
    this.sub_mercado = sub_mercado
    this.valor_proposta = valor_proposta
    this.user = user
  }
}