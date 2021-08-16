import { Guid } from 'guid-typescript';
import {
    Column,
    Entity,
    Generated,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from "../../shared/basic-entity"
import { Proposta } from './proposta.entity';

@Entity({ name: 'cargas' })
export class Carga extends BasicEntity {
/*     @PrimaryColumn({ type: 'int' })
    @Generated('increment')
    id: number; */

    @Column("uuid")
    public id_public: string;

    @Column({ type: 'varchar', name: 'company_name' })
    @IsNotEmpty({ message: "Nome é obrigatório" })
    @IsString()
    @ApiProperty({ description: 'Empresa contratante', type: () => String })
    public nome_empresa: string;

    @Column({ type: 'numeric', name: 'kw_consume' })
    @IsNotEmpty({ message: "Consumo é obrigatório" })
    @IsNumber()
    @ApiProperty({ description: 'Consumo em KW/H', type: () => Number })
    public consumo_kwh: number;

    @ManyToOne(() => Proposta, (proposta) => proposta.carga, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'proposta_id' })
    //@IsUUID(null, { message: "proposta id deve ser um Guid" })
    @ApiProperty({ description: 'Chave estrangeira referente à proposta onde a carga está presente', type: () => Number })
    public proposta: Proposta;

    constructor(nome_empresa: string, consumo_kwh: number) {
        super()
        this.id_public = Guid.create().toString();
        this.nome_empresa = nome_empresa;
        this.consumo_kwh = consumo_kwh;
    }
}
