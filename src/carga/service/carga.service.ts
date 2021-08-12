import { BadRequestException, Injectable } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { UpdateCargaDto } from "../dtos/update-carga.dto";
import { Carga } from "../entity/carga.entity";

@Injectable()
export class CargaService {

  add(entity: Carga): void {
    //
  }

  findAll(): Carga[] {
    return
  }

  findOne(id: Guid): Carga {
    return
  }

  update(id: Guid, dto: UpdateCargaDto): void {
    //
  }

  remove(id: Guid) {
    //
  }
}