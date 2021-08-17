import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entity/usuario.entity';
import * as bcrypt from 'bcrypt';
import { Guid } from 'guid-typescript';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(new Usuario(createUsuarioDto.nome, createUsuarioDto.email, bcrypt.hashSync(createUsuarioDto.password, 8)));
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: Guid): Promise<Usuario> {
    return this.usuarioRepository.findOne(id.toString());
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ email: email });
  }

  async update(id: Guid, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      id_public: id.toString(),
      ...updateUsuarioDto,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario ID ${id} not found`);
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: Guid) {
    const usuario = await this.usuarioRepository.findOne(id.toString());

    if (!usuario) {
      throw new NotFoundException(`Usuario ID ${id} not found`);
    }
    return this.usuarioRepository.remove(usuario);
  }

}
