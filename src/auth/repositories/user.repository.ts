import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "../dto/auth-credentials.dto";
import { UserEntity } from "../entities/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO
    
    const user = new UserEntity()
    
    user.username = username
    user.password = password
    await user.save()

    return null
  }
}
