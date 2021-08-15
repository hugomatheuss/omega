import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usuarioService: UsuarioService) {}

    async validateUsuario(email: string, pass: string): Promise<any> {
        const usuario = await this.usuarioService.findOne(email);
        //comparando a senha passada pelo user(pass) com a senha cadastrada no DB(password)
        if (usuario && bcrypt.compareSync(pass, usuario.password)) {
            const { password, ...result} = usuario;
            return result;
        }
        return null;
    }

}
