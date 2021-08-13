import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { CargaModule } from './carga/carga.module';
import { PropostaModule } from './proposta/proposta.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsuarioModule,
        CargaModule,
        PropostaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
