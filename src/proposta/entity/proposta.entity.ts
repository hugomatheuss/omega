import { Guid } from 'guid-typescript';

import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinTable,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Carga } from './carga.entity';

@Entity({ name: 'proposta' })
export class Proposta {
    @PrimaryGeneratedColumn({ type: 'int' })
    public id: number;

    @Column({ type: 'varchar' })
    public id_public: string;

    @Column({ type: 'date' })
    public data_inicio: Date;

    @Column({ type: 'date' })
    public data_fim: Date;

    @Column({ type: 'boolean', default: false })
    public contratado;

    @Column({ type: 'varchar', length: 12 })
    public fonte_energia: string;

    @Column({ type: 'varchar', length: 8 })
    public sub_mercado: string;

    @Column({ type: 'numeric' })
    public valor_proposta: number;

    // @ManyToOne(() => Usuario, (usuario) => usuario.propostas)
    // usuario: Usuario;

    @OneToMany((type) => Carga, (carga) => carga.proposta)
    // @JoinTable()
    carga: Carga[];

    constructor(
        data_inicio: Date,
        data_fim: Date,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        carga: Carga[],
    ) {
        this.id_public = Guid.create().toString();
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
        this.carga = carga;
    }

    consumototal() {}
}
