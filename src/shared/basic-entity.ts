import { Guid } from 'guid-typescript';
import { Column, CreateDateColumn, Generated, PrimaryColumn } from 'typeorm';

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
    private createdAt: Date;

    constructor() {
        this.id_public = Guid.create().toString();
        this.createdAt = new Date();
    }
}
