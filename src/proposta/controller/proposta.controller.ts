import {
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { IController } from 'src/shared/controller.interface';
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Proposta } from '../entity/proposta.entity';
import { PropostaService } from '../service/proposta.service';

@Controller('proposta')
export class PropostaController implements IController<Proposta> {
    constructor(private readonly service: PropostaService) {}

    @Post()
    add(@Body() createPropostaDto: CreatePropostaDto): Promise<Proposta> {
        return this.service.create(createPropostaDto);
    }

    @Get()
    findAll(): Promise<Proposta[]> {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: Guid): Promise<Proposta> {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: Guid, @Body() updatePropostaDto: UpdatePropostaDto): Promise<Proposta> {
        return this.service.update(id, updatePropostaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: Guid): Promise<Proposta> {
        return this.service.remove(id);
    }
}
