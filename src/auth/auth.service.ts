import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './protocols/jwt-payload.interface';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const result: void = await this.userRepository.singUp(authCredentialsDTO)
    return result
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    const username: string = await this.userRepository.validateUserPassword(authCredentialsDTO)
    if(!username) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload: JwtPayload = { username }
    const accessToken: string = await this.jwtService.sign(payload)
    return { accessToken }
  }
}
