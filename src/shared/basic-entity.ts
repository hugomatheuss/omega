import { Guid } from 'guid-typescript';
import { PrimaryColumn, Generated, Column, CreateDateColumn } from 'typeorm';

export abstract class BasicEntity {
    @PrimaryColumn({ type: 'varchar' })
    public id_public: string;

    @Column({ type: 'int' })
    @Generated('increment')
    public id: number;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public createdAt: Date;

    constructor() {
        this.id_public = Guid.create().toString();
        this.createdAt = new Date();
    }
}
