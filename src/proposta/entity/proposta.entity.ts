import { Guid } from 'guid-typescript';
import { Entity, Column } from 'typeorm';
import { Entity as BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'proposta' })
export class Proposta extends BaseEntity {
    @Column({ type: 'timestamptz' })
    private data_inicio: Date;

    @Column({ type: 'timestamptz' })
    private data_fim: Date;

    @Column({ type: 'boolean' })
    private contratado: boolean = false;

    @Column({ type: 'varchar', length: 12 })
    private fonte_energia: string;

    @Column({ type: 'varchar', length: 7 })
    private sub_mercado: string;

    @Column({ type: 'numeric' })
    private valor_proposta: number;

    // @Column({ type: 'varchar' })
    // private user: string;
}
