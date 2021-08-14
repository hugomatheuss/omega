import { Guid } from 'guid-typescript';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity({ name: 'TB_CARGA' })
export class Carga {
    @PrimaryGeneratedColumn({ type: 'int' })
    public id: number;

    @Column({ type: 'varchar' })
    public id_public: string;

    @Column({ type: 'varchar', name: 'company_name' })
    public nome: string;

    @Column({ type: 'numeric', name: 'kw_consume' })
    public consumo: number;

    @ManyToOne(() => Proposta, (proposta) => proposta.carga)
    public proposta: Proposta;

    constructor(nome: string, consumo: number) {
        this.id_public = Guid.create().toString();
        this.nome = nome;
        this.consumo = consumo;
    }
}
