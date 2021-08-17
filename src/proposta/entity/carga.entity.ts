import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from '../../shared/basic-entity';
import { Proposta } from './proposta.entity';

@Entity({ name: 'cargas' })
export class Carga extends BasicEntity {
    @Column({ type: 'varchar', name: 'nome_empresa' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString()
    public nome_empresa: string;

    @Column({ type: 'numeric', name: 'consumo_kwh' })
    @IsNotEmpty({ message: 'Consumo é obrigatório' })
    @IsNumber()
    public consumo_kwh: number;

    @ManyToOne(() => Proposta, (proposta) => proposta.cargas, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'proposta_id' })
    //@IsUUID(null, { message: "proposta id deve ser um Guid" })
    //@ApiProperty({ description: 'Chave estrangeira referente à proposta onde a carga está presente', type: () => Number })
    public proposta: Proposta;

    constructor(nome_empresa: string, consumo_kwh: number) {
        super();
        this.nome_empresa = nome_empresa;
        this.consumo_kwh = consumo_kwh;
    }
}
