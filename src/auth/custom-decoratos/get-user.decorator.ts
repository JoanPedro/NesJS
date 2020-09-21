import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

export const GetUser = createParamDecorator<UserEntity>((data: unknown, context: ExecutionContext): UserEntity => {
  const request = context.switchToHttp().getRequest()
  return request.user
})
