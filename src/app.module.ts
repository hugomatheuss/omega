import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaModule } from './proposta/proposta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            // type: 'postgres',
            // host: 'localhost',
            // port: 15432,
            // username: 'postgres',
            // password: 'admin',
            // database: 'OmegaDB',
            // autoLoadEntities: true,
            // synchronize: true,
        }),
        AuthModule,
        PropostaModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
