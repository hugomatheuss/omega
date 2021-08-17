import { Guid } from 'guid-typescript';

import {
    Entity,
    Column,
    OneToMany,
    JoinTable,
    ManyToOne,
} from 'typeorm';
import { Carga } from './carga.entity';
import { BasicEntity } from 'src/shared/basic-entity';
import { Usuario } from 'src/usuario/entity/usuario.entity';

@Entity({ name: 'propostas' })
export class Proposta extends BasicEntity {
    @Column({ type: 'date' })
    public data_inicio: Date;

    @Column({ type: 'date' })
    public data_fim: Date;

    @Column({ type: 'boolean', default: false })
    public contratado: boolean;
    
    @Column({ type: 'varchar', length: 12 })
    public fonte_energia: string;

    @Column({ type: 'varchar', length: 8 })
    public sub_mercado: string;
    
    @Column({ type: 'numeric' })
    public valor_proposta: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.propostas)
    usuario: Usuario;

    @OneToMany((type) => Carga, (carga) => carga.proposta, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({})
    cargas: Carga[];

    constructor(
        data_inicio: Date,
        data_fim: Date,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        cargas: Carga[],
    ) {
        super()
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
        this.cargas = cargas;
    }
}
