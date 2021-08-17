import { Proposta } from 'src/proposta/entity/proposta.entity';
import { BasicEntity } from 'src/shared/basic-entity';
import { Entity, Column, OneToMany} from 'typeorm';

@Entity('usuarios')
export class Usuario extends BasicEntity {
  @Column({ type: 'varchar' })
  public nome: string;

  @Column({ type: 'varchar' , unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToMany(() => Proposta, (proposta) => proposta.usuario)
  public propostas: Proposta[];

  constructor(
    nome: string,
    email: string,
    password: string
  ) {
    super()
    this.nome = nome;
    this.email = email;
    this.password = password;
  }
}
