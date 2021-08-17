import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class CreateUsuarioDto {

  @MinLength(3, {
    message: 'O nome deve ter no mínimo 3 caracteres',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome do usuário é obrigatório' })
  @ApiProperty({ example: 'Kobe Bryant', description: 'Nome do usuário', type: () => String })
  public nome: string;

  @IsEmail({}, { message: 'Email incorreto' })
  @IsString()
  @IsNotEmpty({ message: 'O email do usuário é obrigatório' })
  @ApiProperty({ example: 'something123@email.com', description: 'Email do usuário', type: () => String })
  email: string;

  @MinLength(8, {
    message: 'A senha deve ter no mínimo 8 caracteres'
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha do usuário é obrigatória' })
  @ApiProperty({ example: 'batman123!', description: 'Senha do usuário', type: () => String })
  password: string;
}