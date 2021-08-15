import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaController } from './controller/proposta.controller';
import { Carga } from './entity/carga.entity';
import { Proposta } from './entity/proposta.entity';
import { CargaSevice } from './service/carga.service';
import { PropostaService } from './service/proposta.service';

@Module({
    imports: [TypeOrmModule.forFeature([Proposta, Carga])],
    controllers: [PropostaController],
    providers: [PropostaService, CargaSevice],
})
export class PropostaModule {}
