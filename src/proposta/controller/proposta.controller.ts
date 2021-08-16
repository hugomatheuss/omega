import {
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import {
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiNoContentResponse,
} from '@nestjs/swagger';
import { Guid } from 'guid-typescript';
import { IController } from 'src/shared/controller.interface';
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Proposta } from '../entity/proposta.entity';
import { PropostaService } from '../service/proposta.service';

@ApiTags('proposta')
@Controller('proposta')
export class PropostaController implements IController<Proposta> {
    constructor(private readonly service: PropostaService) {}

    @Post()
    @ApiCreatedResponse({ description: 'A proposta foi criada com sucesso' })
    add(@Body() createPropostaDto: CreatePropostaDto): Promise<Proposta> {
        return this.service.create(createPropostaDto);
    }

    @Get()
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: 'Não existem propostas cadastradas' })
    findAll(): Promise<Proposta[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: 'Nenhuma proposta encontrada com este ID' })
    findOne(@Param('id') id: Guid): Promise<Proposta> {
        return this.service.findOne(id);
    }

    @Put(':id')
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: 'Nenhuma proposta encontrada com este ID' })
    update(@Param('id') id: Guid, @Body() updatePropostaDto: UpdatePropostaDto): Promise<Proposta> {
        return this.service.update(id, updatePropostaDto);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    @ApiNotFoundResponse({ description: 'Nenhuma proposta encontrada com este ID' })
    remove(@Param('id') id: Guid): Promise<Proposta> {
        return this.service.remove(id);
    }
}
