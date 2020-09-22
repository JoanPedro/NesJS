import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserEntity } from "../entities/user.entity";
import { JwtPayload } from "../protocols/jwt-payload.interface";
import { UserRepository } from "../repositories/user.repository";
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    })
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload
    const user = await this.userRepository.findOne({ username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
