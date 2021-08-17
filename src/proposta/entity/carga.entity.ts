import { Guid } from 'guid-typescript';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { BasicEntity } from "../../shared/basic-entity"
import { Proposta } from './proposta.entity';

@Entity({ name: 'cargas' })
export class Carga extends BasicEntity {
    @Column({ type: 'varchar', name: 'nome_empresa' })
    public nome_empresa: string;

    @Column({ type: 'numeric', name: 'consumo_kwh' })
    public consumo_kwh: number;

    @ManyToOne(() => Proposta, (proposta) => proposta.cargas, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'proposta_id' })
    public proposta: Proposta;

    constructor(nome_empresa: string, consumo_kwh: number) {
        super()
        this.nome_empresa = nome_empresa;
        this.consumo_kwh = consumo_kwh;
    }
}
