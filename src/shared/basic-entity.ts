import { Guid } from 'guid-typescript';
import { PrimaryColumn, CreateDateColumn } from 'typeorm';

export abstract class BasicEntity {
    @PrimaryColumn({ type: 'uuid', name: 'ID' })
    public id: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public createdAt: Date;

    constructor() {
        this.id = Guid.create().toString();
        this.createdAt = new Date();
    }
}
