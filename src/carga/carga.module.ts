import { Module } from '@nestjs/common';
import { CargaController } from './controller/carga.controller';
import { CargaService } from './service/carga.service';

@Module({
    imports: [],
    controllers: [CargaController],
    providers: [CargaService],
})
export class CargaModule {}
