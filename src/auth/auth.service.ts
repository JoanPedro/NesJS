import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const result = await this.userRepository.singUp(authCredentialsDTO)
    return result
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDTO)
    if(!username) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
