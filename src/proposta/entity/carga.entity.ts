import { Guid } from 'guid-typescript';
import {
    Column,
    Entity,
    Generated,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity({ name: 'cargas' })
export class Carga {
    @Column({ type: 'int' })
    @Generated('increment')
    id: number;

    @PrimaryColumn({ type: 'varchar' })
    public id_public: string;

    @Column({ type: 'varchar', name: 'company_name' })
    public nome: string;

    @Column({ type: 'numeric', name: 'kw_consume' })
    public consumo: number;

    @ManyToOne(() => Proposta, (proposta) => proposta.carga, {
        onDelete: 'CASCADE',
    })
    public proposta: Proposta;

    constructor(nome: string, consumo: number) {
        this.id_public = Guid.create().toString();
        this.nome = nome;
        this.consumo = consumo;
    }
}
