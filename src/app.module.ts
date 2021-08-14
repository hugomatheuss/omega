import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaModule } from './proposta/proposta.module';

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
        PropostaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
