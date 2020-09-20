import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "../dto/auth-credentials.dto";
import { UserEntity } from "../entities/user.entity";

@EntityRepository(UserEntity)
@Injectable()
export class UserRepository extends Repository<UserEntity> {

  async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO
    
    const exists = this.findOne({ username })

    if (exists) {
      throw new ConflictException('Username already exists')
    }

    const user = new UserEntity()
    user.username = username
    user.password = password
    
    try {
      await user.save()
    } catch (error) {
      throw new InternalServerErrorException()
    }

    return null
  }
}
