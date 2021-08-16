import { Guid } from 'guid-typescript';

import {
    Entity,
    Column,
    OneToMany,
    JoinTable,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Generated,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsArray, IsBoolean, IsNumber } from "class-validator";
import { Carga } from './carga.entity';
import { BasicEntity } from 'src/shared/basic-entity';
import { Usuario } from 'src/usuario/entity/usuario.entity';

@Entity({ name: 'propostas' })
export class Proposta extends BasicEntity {
 /*    @PrimaryColumn({ type: 'int' })
    @Generated('increment')
    id: number; */

    @Column("uuid")
    public id_public: string;

    @Column({ type: 'date' })
    @IsNotEmpty({ message: "Data inicial é obrigatória" })
    @IsDate()
    @ApiProperty({ description: 'Data de criação da proposta', type: () => Date })
    public data_inicio: Date;

    @Column({ type: 'date' })
    @IsNotEmpty({ message: "Data final é obrigatória" })
    @IsDate()
    @ApiProperty({ description: 'Data do fim da proposta', type: () => Date })
    public data_fim: Date;
    
    @Column({ type: 'boolean', default: false })
    @IsBoolean()
    public contratado: boolean;
    
    @Column({ type: 'varchar', length: 12 })
    @IsNotEmpty({ message: "Fonte de energia é obrigatório" })
    @IsString()
    @ApiProperty({ description: 'Tipos de fontes de energia', type: () => String })
    public fonte_energia: string;

    @Column({ type: 'varchar', length: 8 })
    @IsNotEmpty({ message: "Submercado é obrigatório" })
    @IsString()
    @ApiProperty({ description: 'Divisões de submercados de energia', type: () => String })
    public sub_mercado: string;
    
    @Column({ type: 'numeric' })
    @IsNotEmpty()
    @IsNumber()
    public valor_proposta: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.propostas)
    usuario: Usuario;

    @OneToMany((type) => Carga, (carga) => carga.proposta, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({})
    @ApiProperty({ description: 'Cargas vinculadas à proposta', type: () => Array })
    @IsNotEmpty({ message: "Você deve adicionar pelo menos uma carga" })
    @IsArray()
    carga: Carga[];

    constructor(
        data_inicio: Date,
        data_fim: Date,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        carga: Carga[],
    ) {
        super()
        this.id_public = Guid.create().toString();
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
        this.carga = carga;
    }
}
