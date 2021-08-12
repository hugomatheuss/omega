import {
  BadRequestException,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common'
import { Param } from '@nestjs/common'
import { Controller, Get, Post } from '@nestjs/common'
import { Guid } from 'guid-typescript'
import { IController } from "src/shared/controller.interface";
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Proposta } from "../entity/proposta.entity";
import { PropostaService } from '../service/proposta.service';

@Controller('proposta')
export class PropostaController implements IController<Proposta> {
  constructor(private service: PropostaService) { }
  
  @Post()
  add(@Body() dto: CreatePropostaDto): void {
    //const p = new Proposta(dto)
    //this.service.add(p)
  }

  @Get(':id')
  findOne(@Param('id') id: Guid): Proposta {
    return this.service.findOne(id)
  }

  @Get()
  findAll(): Proposta[] {
    return this.service.findAll()
  }

  @Delete(':id')
  remove(@Param('id') id: Guid): void {
    this.service.remove(id)
  }

  @Put(':id')
  update(@Param('id') id: Guid, @Body() dto: UpdatePropostaDto): void {
    this.service.update(id, dto)
  }

  @Post()
  calculate() {
    //TODO
  }
}