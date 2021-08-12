import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    create(createUsuarioDto: CreateUsuarioDto) {
        // crio o objeto com base no dto
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        // salvo o objeto criado
        return this.usuarioRepository.save(usuario);
    }

    findAll() {
        return this.usuarioRepository.find();
    }

    findOne(id: number) {
        const usuario = this.usuarioRepository.findOne(id);
        return usuario;
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const usuario = await this.usuarioRepository.preload({
            id: id,
            ...updateUsuarioDto,
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario ID ${id} not found`);
        }
        return this.usuarioRepository.save(usuario);
    }

    async remove(id: number) {
        const usuario = await this.usuarioRepository.findOne(id);

        if (!usuario) {
            throw new NotFoundException(`Usuario ID ${id} not found`);
        }
        return this.usuarioRepository.remove(usuario);
    }
}
