import { Guid } from "guid-typescript";
import { Entity } from "./base.entity";

export interface IController<TEntity extends Entity> {
  add(dto: any): void
  findOne(id: Guid): TEntity
  findAll(): TEntity[]
  remove(id: Guid): void
  update(id: Guid, dto: any): void
}