import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
      return await this.userRepository.singUp(authCredentialsDTO)
    }
}
