import { Guid } from 'guid-typescript';
import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class BasicEntity {
    @PrimaryGeneratedColumn()
    public id: string;

    constructor() {
        this.id = Guid.create().toString();
    }
}
