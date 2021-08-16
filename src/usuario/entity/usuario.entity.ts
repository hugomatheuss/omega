import { Proposta } from 'src/proposta/entity/proposta.entity';
import { BasicEntity } from 'src/shared/basic-entity';
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, Generated } from 'typeorm';

@Entity('usuarios')
export class Usuario extends BasicEntity {
/*   @Column({ type: 'int' })
  @Generated('increment')
  id: number; */

  @Column("uuid")
  public id_public: string;

  @Column()
  @MinLength(3)
  @IsNotEmpty({ message: "o nome do usuário é obrigatório" })
  public nome: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Email incorreto' })
  @IsNotEmpty({ message: "o email do usuário é obrigatório" })
  public email: string;

  @Column()
  @MinLength(8)
  @IsNotEmpty({ message: "a senha do usuário é obrigatória" })
  public password: string;

  @OneToMany(() => Proposta, (proposta) => proposta.usuario)
  public propostas: Proposta[];
}