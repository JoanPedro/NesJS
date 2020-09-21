import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDTO } from "../dto/auth-credentials.dto";
import { UserEntity } from "../entities/user.entity";

@EntityRepository(UserEntity)
@Injectable()
export class UserRepository extends Repository<UserEntity> {

  async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO
    
    const exists = await this.findOne({ username })

    if (exists) {
      throw new ConflictException('Username already exists')
    }

    const user = new UserEntity()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)
    
    try {
      await user.save()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
    const { username, password } = authCredentialsDTO
    const user = await this.findOne({ username })

    if (user && await user.validatePassword(password)) {
      return user.username
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }
}
