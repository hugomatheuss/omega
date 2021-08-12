import { Guid } from 'guid-typescript'
import { Column, Entity } from "typeorm";
import { Entity as BaseEntity } from "src/shared/base.entity";

@Entity({ name: 'carga' })
export class Carga extends BaseEntity {
  
  @Column({ type: 'varchar' })
  private company_name: string

  @Column({ type: 'numeric' })
  private kw_consume: number

  @Column({ type: 'varchar' })
  private proposta_id: string

  constructor(company_name: string, kw_consume: number, proposta_id: string) {
    super()
    this.company_name = company_name
    this.kw_consume = kw_consume
    this.proposta_id = proposta_id
  }
}