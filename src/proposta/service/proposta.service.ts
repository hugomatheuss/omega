import { BadRequestException, Injectable } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { UpdatePropostaDto } from "../dtos/update-proposta.dto";
import { Proposta } from "../entity/proposta.entity";

@Injectable()
export class PropostaService {

  readonly kw_value = 10
  public propostas: Proposta[] = []
  
  add(entity: Proposta): void {
    this.propostas.push(entity)
    //return res.(200)
  }

  findAll(): Proposta[] {
    return this.propostas
  }

  findOne(id: Guid): Proposta {
    return this.propostas.find(p => p.id_public == id.toString())
  }

  update(id: Guid, dto: UpdatePropostaDto): void {
    //if (dto.value == 0) throw new BadRequestException("Valor inválido")

    var proposta = this.findOne(id)
    //TODO
  }

  remove(id: Guid) {
    const index = this.propostas.findIndex(p => p.id_public == id.toString())
    this.propostas.splice(index, 1)
  }

  calculate(sub_market: string, font: string, total_consume: number) {
    let sub_market_value: number
    let font_value: number
    let total_value: number

    switch (sub_market) {
      case 'Norte': {
        sub_market_value = 2
        break
      }
      case 'Nordeste': {
        sub_market_value = -1
        break
      }
      case 'Sul': {
        sub_market_value = 3.5
        break
      }
      case 'Sudeste': {
        sub_market_value = 1.5
        break
      }
    }

    font_value = font == 'Convencional' ? 5 : -2
    total_value = (total_consume * this.kw_value) + (sub_market_value + font_value)

    return total_value
  }
}