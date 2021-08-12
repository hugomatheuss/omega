import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaController } from './controller/proposta.controller';
import { Proposta } from './entity/proposta.entity';
import { PropostaService } from './service/proposta.service';

@Module({
    imports: [TypeOrmModule.forFeature([Proposta])],
    controllers: [PropostaController],
    providers: [PropostaService],
})
export class PropostaModule {}
